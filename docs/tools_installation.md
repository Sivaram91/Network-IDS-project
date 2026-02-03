# Tools Installation Guide

Complete guide for installing all software tools needed for this project.

-----
[TOC]

## Table of Contents

- [Raspberry Pi Tools](#raspberry-pi-tools)
- [STM32 Tools](#stm32-tools)
- [Development Tools](#development-tools)
- [Verification](#verification)

-----

## Raspberry Pi Tools

### 1. Operating System

**Raspberry Pi OS (Recommended)**

**Download & Install:**

1. Download [Raspberry Pi Imager](https://www.raspberrypi.com/software/)
1. Install on your computer (Windows/Mac/Linux)
1. Run the imager
1. Select OS: “Raspberry Pi OS (64-bit)”
1. Select your SD card
1. Write image

**Link:** https://www.raspberrypi.com/software/

-----

### 2. Python Environment

**Python 3.9+ (Pre-installed on Raspberry Pi OS)**

**Verify:**

```bash
python3 --version
```

**If not installed:**

```bash
sudo apt update
sudo apt install -y python3 python3-pip
```

-----

### 3. Python Packages

**Core ML/Data Science:**

```bash
# NumPy - numerical computing
pip3 install numpy

# Pandas - data manipulation
pip3 install pandas

# Scikit-learn - machine learning
pip3 install scikit-learn

# Matplotlib - visualization
pip3 install matplotlib

# Seaborn - statistical visualization
pip3 install seaborn
```

**Network Analysis:**

```bash
# Scapy - packet manipulation
pip3 install scapy

# PyShark - Wireshark wrapper (optional)
pip3 install pyshark
```

**Utilities:**

```bash
# Joblib - model serialization
pip3 install joblib

# Requests - HTTP library (for cloud features)
pip3 install requests
```

**All at once:**

```bash
pip3 install numpy pandas scikit-learn matplotlib seaborn scapy joblib requests
```

-----

### 4. System Tools

**Network Tools:**

```bash
sudo apt install -y tcpdump wireshark
```

**Development Tools:**

```bash
sudo apt install -y git vim build-essential
```

**Optional (for advanced features):**

```bash
# Docker (for containerization - Phase 3+)
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker pi

# Grafana (for dashboard - Phase 3+)
# Instructions: https://grafana.com/docs/grafana/latest/setup-grafana/installation/debian/
```

-----

## STM32 Tools

### 1. STM32CubeIDE

**Integrated Development Environment for STM32**

**Download:**

- Link: https://www.st.com/en/development-tools/stm32cubeide.html
- Version: Latest (1.14.x or newer)
- Platforms: Windows, Linux, Mac

**Installation:**

1. Download installer for your OS
1. Run installer
1. Accept license
1. Choose installation directory
1. Complete installation

**First Launch:**

1. Open STM32CubeIDE
1. Select workspace location
1. Install any prompted updates

-----

### 2. STM32CubeMX

**Code Generation Tool (included in CubeIDE)**

If using standalone:

- Link: https://www.st.com/en/development-tools/stm32cubemx.html

-----

### 3. ST-Link Drivers

**USB Drivers for Programming/Debugging**

**Windows:**

- Download: https://www.st.com/en/development-tools/stsw-link009.html
- Run installer

**Linux:**

```bash
sudo apt install -y stlink-tools
```

**Mac:**

```bash
brew install stlink
```

**Verify Connection:**

```bash
# Connect STM32 via USB
st-info --probe
```

-----

### 4. TensorFlow Lite Micro

**For TinyML on STM32**

**Download:**

- GitHub: https://github.com/tensorflow/tflite-micro
- Will be integrated into STM32 project (detailed setup in Phase 1)

**Pre-built libraries:**

- Available through STM32Cube.AI (X-CUBE-AI package)

-----

## Development Tools (Your Computer)

### 1. Git

**Version Control**

**Windows:**

- Download: https://git-scm.com/download/win
- Run installer with default options

**Mac:**

```bash
brew install git
```

**Linux:**

```bash
sudo apt install git
```

**Configure:**

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

-----

### 2. VS Code (Optional but Recommended)

**Code Editor**

**Download:** https://code.visualstudio.com/

**Recommended Extensions:**

- Python
- C/C++
- Markdown All in One
- PlantUML
- GitLens

-----

### 3. Serial Terminal

**For STM32 Debugging**

**Options:**

- **PuTTY** (Windows): https://www.putty.org/
- **screen** (Linux/Mac): Pre-installed
- **CoolTerm**: https://freeware.the-meiers.org/

**Usage:**

```bash
# Linux/Mac
screen /dev/ttyACM0 115200

# Or
minicom -D /dev/ttyACM0
```

-----

### 4. Wireshark (Desktop)

**Network Protocol Analyzer**

**Download:** https://www.wireshark.org/download.html

**Use for:**

- Analyzing captured traffic
- Debugging network issues
- Viewing packet details

-----

## Verification

### Raspberry Pi Verification Script

**Create file:** `scripts/verify_setup.py`

```python
#!/usr/bin/env python3
"""
Setup Verification Script
Checks if all required packages are installed
"""

import sys

def check_import(module_name, package_name=None):
"""Try to import a module"""
if package_name is None:
package_name = module_name

try:
__import__(module_name)
print(f"✅ {package_name} - OK")
return True
except ImportError:
print(f"❌ {package_name} - MISSING")
print(f" Install: pip3 install {package_name}")
return False

def main():
print("=" * 50)
print("Network IDS - Setup Verification")
print("=" * 50 + "\n")

print("Checking Python version...")
version = sys.version_info
if version.major == 3 and version.minor >= 9:
print(f"✅ Python {version.major}.{version.minor}.{version.micro} - OK\n")
else:
print(f"❌ Python {version.major}.{version.minor} - Need 3.9+\n")
return False

print("Checking required packages...")

all_ok = True
all_ok &= check_import("numpy")
all_ok &= check_import("pandas")
all_ok &= check_import("sklearn", "scikit-learn")
all_ok &= check_import("matplotlib")
all_ok &= check_import("seaborn")
all_ok &= check_import("scapy")
all_ok &= check_import("joblib")
all_ok &= check_import("requests")

print("\n" + "=" * 50)
if all_ok:
print("🎉 All checks passed! You're ready to start.")
else:
print("⚠️ Some packages are missing. Install them and rerun.")
print("=" * 50)

return all_ok

if __name__ == "__main__":
success = main()
sys.exit(0 if success else 1)
```

**Run verification:**

```bash
python3 scripts/verify_setup.py
```

-----

### STM32 Verification

**Test Program:**

1. Open STM32CubeIDE
1. Create new STM32 project
1. Select NUCLEO-F756ZG board
1. Generate code
1. Build project (Ctrl+B)
1. Flash to board (Run button)
1. Check blinking LED

**If successful:** ✅ Environment ready

-----

## Tool Reference Quick Links

|Tool |Purpose |Link |
|-------------------|-------------------|------------------------------------------------|
|Raspberry Pi Imager|OS installation |https://www.raspberrypi.com/software/ |
|Python |Programming |https://www.python.org/ |
|Scikit-learn |Machine learning |https://scikit-learn.org/ |
|Scapy |Packet manipulation|https://scapy.net/ |
|STM32CubeIDE |STM32 development |https://www.st.com/stm32cubeide |
|TensorFlow Lite |TinyML |https://www.tensorflow.org/lite/microcontrollers|
|Git |Version control |https://git-scm.com/ |
|VS Code |Code editor |https://code.visualstudio.com/ |
|Wireshark |Network analysis |https://www.wireshark.org/ |

-----

## Troubleshooting

### “pip: command not found”

```bash
sudo apt install python3-pip
```

### “Permission denied” when installing packages

```bash
# Use --user flag
pip3 install --user package_name

# Or use virtual environment (recommended)
python3 -m venv venv
source venv/bin/activate
pip install package_name
```

### STM32 not detected

- Check USB cable (data cable, not charging-only)
- Install/update ST-Link drivers
- Try different USB port

### Scapy requires root permissions

```bash
# Add user to necessary groups
sudo usermod -aG wireshark $USER

# Log out and back in, or reboot
```

-----

## Next Steps

✅ All tools installed?

**Continue to:**

- [Getting Started](getting_started.md) - Environment setup
- Start coding! Check `/src` folder

-----

**Questions?** Open an [issue on GitHub](https://github.com/Sivaram91/Network-IDS-project)
