# terraform_devops_task
HSE terraform devops task


# Mac OS docker port fix using socat 

`socat TCP-LISTEN:2375,reuseaddr,fork UNIX-CONNECT:/var/run/docker.sock`