$ScriptDir  = Split-Path -Parent $MyInvocation.MyCommand.Path
$ProjectRoot = Resolve-Path (Join-Path $ScriptDir "..")

$ManagePy = Join-Path $ProjectRoot "manage.py"
$RequirementsFile = Join-Path $ProjectRoot "requirements.txt"
$VenvName = Join-Path $ProjectRoot ".venv"
$EnvFile  = Join-Path $ProjectRoot ".env"

if (-not (Test-Path $ManagePy)) {
    Write-Error "manage.py not found in project root: $ProjectRoot"
    exit 1
}

function New-RandomSecretKey {
    $length = 64
    $chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+'
    $bytes = New-Object byte[] $length
    [System.Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($bytes)
    -join ($bytes | ForEach-Object { $chars[$_ % $chars.Length] })
}

Write-Host "==============================="
Write-Host " Project Setup (Windows - PS)"
Write-Host "==============================="

# Recreate virtual environment
if (Test-Path $VenvName) {
    Write-Host "Existing virtual environment detected. Removing..."
    Remove-Item -Recurse -Force $VenvName
}

Write-Host "Creating virtual environment..."
python -m venv $VenvName

Write-Host "Activating virtual environment..."
& "$VenvName\Scripts\Activate.ps1"

Write-Host "Upgrading pip..."
python -m pip install --upgrade pip

# Install dependencies FROM PROJECT ROOT
if (Test-Path $RequirementsFile) {
    Write-Host "Installing dependencies from requirements.txt..."
    pip install -r $RequirementsFile
} else {
    Write-Error "requirements.txt not found in project root: $ProjectRoot"
    exit 1
}

# Create .env ONLY IN PROJECT ROOT
if (-not (Test-Path $EnvFile)) {
    Write-Host "Creating .env file in project root..."

    $SecretKey = New-RandomSecretKey

@"
DEBUG=True
SECRET_KEY=$SecretKey
"@ | Out-File -FilePath $EnvFile -Encoding utf8 -Force

    Write-Host "--------------------------------"
    Write-Host "IMPORTANT:"
    Write-Host ".env file created in project root."
    Write-Host "CHANGE the SECRET_KEY before production use."
    Write-Host "--------------------------------"
} else {
    Write-Host ".env file already exists in project root. Skipping creation."
}

Write-Host "==============================="
Write-Host " Setup completed successfully!"
Write-Host " Activate later using:"
Write-Host "     $VenvName\Scripts\Activate.ps1"
Write-Host "==============================="
