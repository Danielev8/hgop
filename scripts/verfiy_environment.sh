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
echo "Operating system:     $OS"

# If statements are used to check if the tools exists, if they do then print out their version, else displays error message
if [ "$NPM_VERSION" ]
then
    echo "NPM version:          $NPM_VERSION"
else
    echo "NPM is not installed"
fi

if [ "$GIT_VERSION" ]
then
    echo "Git version:          $GIT_VERSION"
else
    echo "Git is not installed"
fi

if [ "$NODE_VERSION" ]
then
    echo "NodeJS version:       $NODE_VERSION"
else
    echo "NodeJS is not installed"
fi

# Printing when the script starts and when the script ends
echo "Script started at:    $start
Ended at:             $(date)" 
} 

# Printing into terminal and into the output file
print_output 2>&1 | tee $log_file 