$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$ProjectRoot = Resolve-Path (Join-Path $ScriptDir "..")

$ManagePy = Join-Path $ProjectRoot "manage.py"

if (-not (Test-Path $ManagePy)) {
    Write-Error "manage.py not found in project root: $ProjectRoot"
    exit 1
}

$VenvName = Join-Path $ProjectRoot ".venv"
$EnvFile  = Join-Path $ProjectRoot ".env"

function New-RandomSecretKey {
    $length = 16
    $chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+'
    $bytes = New-Object byte[] $length
    [System.Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($bytes)
    -join ($bytes | ForEach-Object { $chars[$_ % $chars.Length] })
}

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

if (-not (Test-Path $EnvFile)) {
    Write-Host "Creating .env file..."

    $SecretKey = New-RandomSecretKey

@"
DEBUG=True
SECRET_KEY=$SecretKey
"@ | Out-File -FilePath $EnvFile -Encoding utf8

    Write-Host "--------------------------------"
    Write-Host "IMPORTANT:"
    Write-Host ".env file was created with a generated SECRET_KEY."
    Write-Host "Please CHANGE the SECRET_KEY value before deploying to production."
    Write-Host "--------------------------------"
} else {
    Write-Host ".env file already exists. Skipping creation."
}

Write-Host "==============================="
Write-Host " Setup completed successfully!"
Write-Host " To activate later:"
Write-Host "     $VenvName\Scripts\Activate.ps1"
Write-Host "==============================="
