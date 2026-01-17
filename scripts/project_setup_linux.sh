#!/usr/bin/env bash
set -e

echo "==============================="
echo " Project Setup (Linux / macOS)"
echo "==============================="

# Resolve script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

MANAGE_PY="$PROJECT_ROOT/manage.py"

if [[ ! -f "$MANAGE_PY" ]]; then
    echo "ERROR: manage.py not found in project root: $PROJECT_ROOT"
    exit 1
fi

VENV_DIR="$PROJECT_ROOT/.venv"
ENV_FILE="$PROJECT_ROOT/.env"

# Generate random 16-char secret (crypto-safe)
generate_secret_key() {
    local length=16
    local chars='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+'
    tr -dc "$chars" </dev/urandom | head -c "$length"
}

# Remove existing virtual environment
if [[ -d "$VENV_DIR" ]]; then
    echo "Existing virtual environment detected. Removing..."
    rm -rf "$VENV_DIR"
fi

# Create virtual environment
echo "Creating virtual environment..."
python3 -m venv "$VENV_DIR"

# Activate virtual environment
echo "Activating virtual environment..."
source "$VENV_DIR/bin/activate"

# Upgrade pip
echo "Upgrading pip..."
python -m pip install --upgrade pip

# Install dependencies
if [[ -f "$PROJECT_ROOT/requirements.txt" ]]; then
    echo "Installing dependencies from requirements.txt..."
    pip install -r "$PROJECT_ROOT/requirements.txt"
else
    echo "ERROR: requirements.txt not found!"
    exit 1
fi

# Create .env file if missing
if [[ ! -f "$ENV_FILE" ]]; then
    echo "Creating .env file..."

    SECRET_KEY="$(generate_secret_key)"

    cat > "$ENV_FILE" <<EOF
DEBUG=True
SECRET_KEY=$SECRET_KEY
EOF

    echo "--------------------------------"
    echo "IMPORTANT:"
    echo ".env file was created with a generated SECRET_KEY."
    echo "Please CHANGE the SECRET_KEY value before deploying to production."
    echo "--------------------------------"
else
    echo ".env file already exists. Skipping creation."
fi

echo "==============================="
echo " Setup completed successfully!"
echo " To activate later:"
echo "     source .venv/bin/activate"
echo "==============================="
