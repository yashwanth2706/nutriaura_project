#!/usr/bin/env bash

set -e  # Exit immediately if any command fails

VENV_NAME=".venv"

echo "==============================="
echo " Project Setup (Linux / macOS)"
echo "==============================="

# Check if virtual environment exists
if [ -d "$VENV_NAME" ]; then
    echo "Existing virtual environment detected. Removing..."
    rm -rf "$VENV_NAME"
fi

# Create virtual environment
echo "Creating virtual environment..."
python3 -m venv "$VENV_NAME"

# Activate virtual environment
echo "Activating virtual environment..."
# shellcheck disable=SC1091
source "$VENV_NAME/bin/activate"

# Upgrade pip
echo "Upgrading pip..."
python -m pip install --upgrade pip

# Install dependencies
if [ -f "requirements.txt" ]; then
    echo "Installing dependencies from requirements.txt..."
    pip install -r requirements.txt
else
    echo "ERROR: requirements.txt not found!"
    exit 1
fi

echo "==============================="
echo " Setup completed successfully!"
echo " To activate later:"
echo "     source $VENV_NAME/bin/activate"
echo "==============================="
