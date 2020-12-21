terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 2.70"
    }
  }
}

provider "aws" {
  profile = "default"
  region  = "us-west-2"
}


# mongodb database setup
resource "aws_db_instance" "devops_db" {
  name                 = "devops_db"
  engine               = "mongodb"
  instance_class       = "db.t2.micro"
  allocated_storage    = 10
  username             = "admin"
  password             = "admin"
  vpc_security_group_ids = [
    aws_security_group.devops_security-group.id
  ]
}


# gateway (only for cars as soon as we need simple app)
resource "aws_api_gateway_rest_api" "devops_api" {
  name        = "devops_api"
  description = "Hello world api"
}
resource "aws_api_gateway_resource" "devops_api-cars" {
  rest_api_id = aws_api_gateway_rest_api.devops_api.id
  parent_id   = aws_api_gateway_rest_api.devops_api.root_resource_id
  path_part   = "cars"
}
resource "aws_api_gateway_method" "devops_api-cars-method1" {
  rest_api_id   = aws_api_gateway_rest_api.devops_api.id
  resource_id   = aws_api_gateway_resource.devops_api-cars.id
  http_method   = "GET,POST"
  authorization = "NONE"
}
resource "aws_api_gateway_integration" "devops_api-cars-method1-integration" {
  rest_api_id               = aws_api_gateway_rest_api.devops_api.id
  resource_id               = aws_api_gateway_resource.devops_api-cars.id
  http_method               = aws_api_gateway_method.devops_api-cars-method1.http_method
  type                      = "HTTP_PROXY"
  integration_http_method   = "GET,POST"
  uri                       = "http://${aws_instance.devops.public_ip}/"
}


# web app
resource "aws_instance" "devops" {
  ami           = "ami-9a98fh77qgk07b9f"
  instance_type = "t2.micro"

  key_name = aws_key_pair.devops_key.key_name
  user_data = file("database/setup.sh")

  vpc_security_group_ids = [
    aws_security_group.devops_security-group.id
  ]
}


# zap
resource "docker_container" "devops_zap-container" {
  name  = "devops_zap"
  image = docker_image.devops_zap-image.latest
  command = "docker run -u zap -p 8080:8080 -i owasp/zap2docker-stable zap.sh -daemon -host http://${aws_instance.devops.public_ip}/" 
}

resource "docker_image" "devops_zap-image" {
  name = "devops_zap-image"
  build {
    path = "zap"
  }
}
