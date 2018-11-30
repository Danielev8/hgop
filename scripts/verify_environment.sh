#!/bin/bash
# setting variables
# Getting the name of the current user
NAME="$USER" 
# Name of the log file to output
log_file=verify_environment.log
# Getting the time when the script starts
start="$(date)"
# Getting the System information
OS="$(uname -srm)"
OS_CHECK=$(uname -srm | cut -d' ' -f1)
# alternative to get ubuntu version
#OS="$(lsb_release -d | awk -F'Description:\t' '{print $2}')"
# getting the version of the tools listed, grep and cuts are used to get just the version numbers, not texts.gi
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


#Function to print out our output
print_output()
{
# Welcoming message
echo
echo "Welcome $NAME"
echo
# What this script does
echo "This script is designed to check and display all versions of all the tools
that are installed on this machine and what operating system you are running"
echo

# Operating system information
if [[ $OS_CHECK == "Darwin" ]]; then
    echo "Operating System:         $OS"
elif [[ $OS_CHECK == "Linux" ]]; then
    echo "Operating System:         $OS"
else
    echo "OS is not supported!"
fi



# If statements are used to check if the tools exists, if they do then print out their version, else displays error message
if [ "$NPM_VERSION" ]
then
    echo "NPM version:              $NPM_VERSION"
else
    echo "NPM version:              NOT INSTALLED"
fi

if [ "$GIT_VERSION" ]
then
    echo "Git version:              $GIT_VERSION"
else
    echo "Git version:              NOT INSTALLED"
fi

if [ "$NODE_VERSION" ]
then
    echo "NodeJS version:           $NODE_VERSION"
else
    echo "NodeJS version:           NOT INSTALLED"
fi

if [ "$DOCKER_VERSION" ]
then 
    echo "Docker version:           $DOCKER_VERSION"
else
    echo "Docker version:           NOT INSTALLED"
fi

if [ "$DOCKER_COMPOSE_VERSION" ]
then
    echo "Docker-compose version:   $DOCKER_COMPOSE_VERSION"
else
    echo "Docker-compose version:   NOT INSTALLED"
fi

if [ "$AWS_VERSION_CHECK" ]
then
    echo "AWS version:              $AWS_VERSION_CLI
                          $AWS_VERSION_PYTHON
                          $AWS_VERSION_LINUX
                          $AWS_VERSION_BOTO"
else
    echo "AWS version:              NOT INSTALLED"
fi

if [ "$TERRAFORM_VERSION" ]
then
    echo "Terraform version:        $TERRAFORM_VERSION"
    echo "Terraform providers:      $TERRAFORM_PROVIDERS"
else 
    echo "Terraform version:        NOT INSTALLED"
fi

# Printing when the script starts and when the script ends
echo 
echo "Script started at:        $start
Ended at:                 $(date)" 
} 

# Printing into terminal and into the output file
print_output 2>&1 | tee $log_file 