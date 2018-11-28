#!/bin/bash
# setting variables
# Getting the name of the current user
NAME="$USER" 
log_file=output.log
# Getting the time when the script starts
start="$(date)"
# Getting the System information
OS="$(uname -srm)"
# alternative to get ubuntu version
#OS="$(lsb_release -d | awk -F'Description:\t' '{print $2}')"
# getting the version of the tools listed
GIT_VERSION="$(git --version | grep -Po "(\d+\.)+\d+")"
NPM_VERSION="$(npm --version)"
NODE_VERSION="$(node -v)"
AWS_VERSION_CHECK="$(aws --version)"
AWS_VERSION_CLI="$(aws --version | cut -d' ' -f1)"
AWS_VERSION_PYTHON="$(aws --version | cut -d' ' -f2)"
AWS_VERSION_LINUX="$(aws --version | cut -d' ' -f3)"
AWS_VERSION_BOTO="$(aws --version | cut -d' ' -f4)"
TERRAFORM_VERSION="$(terraform --version | cut -d' ' -f2 | head -1)"
TERRAFORM_PROVIDERS="$(terraform --version | sed '/Terraform/d')"
DOCKER_VERSION="$(docker --version | cut -d' ' -f1-2 --complement)"
DOCKER_COMPOSE_VERSION="$(docker-compose --version | cut -d' ' -f1-2 --complement)"

# Colors for font
RED="\e[91m"
GREEN="\e[92m"
WHITE="\033[1m\033[0m"


#Function to print out our output
print_output()
{
# Welcoming message
echo "Welcome $NAME"
echo
# What this script does
echo "This script is designed to check and display all versions of all the tools
that are installed on this machine and what operating system you are running"
echo
# Operating system information
echo "Operating system:         $OS"

# If statements are used to check if the tools exists, if they do then print out their version, else displays error message
if [ "$NPM_VERSION" ]
then
    echo -e "NPM version:             $GREEN $NPM_VERSION $WHITE"
else
    echo -e "NPM version:             $RED NOT INSTALLED $WHITE"
fi

if [ "$GIT_VERSION" ]
then
    echo -e "Git version:             $GREEN $GIT_VERSION $WHITE"
else
    echo -e "Git version:             $RED NOT INSTALLED $WHITE"
fi

if [ "$NODE_VERSION" ]
then
    echo -e "NodeJS version:          $GREEN $NODE_VERSION $WHITE"
else
    echo -e "NodeJS version:          $RED NOT INSTALLED $WHITE"
fi

if [ "$DOCKER_VERSION" ]
then 
    echo -e "Docker version:          $GREEN $DOCKER_VERSION $WHITE"
else
    echo -e "Docker version:          $RED NOT INSTALLED $WHITE"
fi

if [ "$DOCKER_COMPOSE_VERSION" ]
then
    echo -e "Docker-compose version:  $GREEN $DOCKER_COMPOSE_VERSION $WHITE"
else
    echo -e "Docker-compose version:  $RED NOT INSTALLED $WHITE"
fi

if [ "$AWS_VERSION_CHECK" ]
then
    echo -e "AWS version:             $GREEN $AWS_VERSION_CLI
                          $AWS_VERSION_PYTHON
                          $AWS_VERSION_LINUX
                          $AWS_VERSION_BOTO $WHITE"
else
    echo -e "AWS version:             $RED NOT INSTALLED $WHITE"
fi

if [ "$TERRAFORM_VERSION" ]
then
    echo -e "Terraform version:       $GREEN $TERRAFORM_VERSION $WHITE"
    echo -e "Terraform providers:     $GREEN $TERRAFORM_PROVIDERS $WHITE"
else 
    echo -e "Terraform version:       $RED NOT INSTALLED $WHTE"
fi

# Printing when the script starts and when the script ends
echo 
echo "Script started at:        $start
Ended at:                 $(date)" 
} 

# Printing into terminal and into the output file
print_output 2>&1 | tee $log_file 