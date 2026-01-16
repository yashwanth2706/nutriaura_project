$VenvName = ".venv"

Write-Host "==============================="
Write-Host " Project Setup (Windows - PS)"
Write-Host "==============================="

# Check if virtual environment exists
if (Test-Path $VenvName) {
    Write-Host "Existing virtual environment detected. Removing..."
    Remove-Item -Recurse -Force $VenvName
}

# Create virtual environment
Write-Host "Creating virtual environment..."
python -m venv $VenvName

# Activate virtual environment
Write-Host "Activating virtual environment..."
& "$VenvName\Scripts\Activate.ps1"

# Upgrade pip
Write-Host "Upgrading pip..."
python -m pip install --upgrade pip

# Install dependencies
if (Test-Path "requirements.txt") {
    Write-Host "Installing dependencies from requirements.txt..."
    pip install -r requirements.txt
} else {
    Write-Error "requirements.txt not found!"
    exit 1
}

Write-Host "==============================="
Write-Host " Setup completed successfully!"
Write-Host " To activate later:"
Write-Host "     $VenvName\Scripts\Activate.ps1"
Write-Host "==============================="
