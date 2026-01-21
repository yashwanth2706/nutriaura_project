#!/usr/bin/env bash
set -e

# -------------------------------
# Resolve script directory
# -------------------------------
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

MANAGE_PY="$PROJECT_ROOT/manage.py"
REQUIREMENTS_FILE="$PROJECT_ROOT/requirements.txt"
VENV_DIR="$PROJECT_ROOT/.venv"
ENV_FILE="$PROJECT_ROOT/.env"

# -------------------------------
# Validate project root
# -------------------------------
if [[ ! -f "$MANAGE_PY" ]]; then
    echo " manage.py not found in project root: $PROJECT_ROOT"
    exit 1
fi

# -------------------------------
# Generate random SECRET_KEY
# -------------------------------
generate_secret_key() {
    local length=16
    local chars='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+'
    tr -dc "$chars" < /dev/urandom | head -c "$length"
}

echo "==============================="
echo " Project Setup (Linux/macOS)"
echo "==============================="

# -------------------------------
# Recreate virtual environment
# -------------------------------
if [[ -d "$VENV_DIR" ]]; then
    echo " Existing virtual environment detected. Removing..."
    rm -rf "$VENV_DIR"
fi

echo " Creating virtual environment..."
python3 -m venv "$VENV_DIR"

echo " Activating virtual environment..."
source "$VENV_DIR/bin/activate"

echo "  Upgrading pip..."
python -m pip install --upgrade pip

# -------------------------------
# Install dependencies
# -------------------------------
if [[ -f "$REQUIREMENTS_FILE" ]]; then
    echo " Installing dependencies from requirements.txt..."
    pip install -r "$REQUIREMENTS_FILE"
else
    echo " requirements.txt not found in project root: $PROJECT_ROOT"
    exit 1
fi

# -------------------------------
# Create .env in project root
# -------------------------------
if [[ ! -f "$ENV_FILE" ]]; then
    echo " Creating .env file in project root..."

    SECRET_KEY="$(generate_secret_key)"

    cat <<EOF > "$ENV_FILE"
DEBUG=True
SECRET_KEY=$SECRET_KEY
EOF

    echo "--------------------------------"
    echo "IMPORTANT:"
    echo ".env file created in project root."
    echo "CHANGE the SECRET_KEY before production use."
    echo "--------------------------------"
else
    echo " .env file already exists in project root. Skipping creation."
fi

echo "==============================="
echo " Setup completed successfully!"
echo " Activate later using:"
echo "     source .venv/bin/activate"
echo "==============================="
