# Getting Started

_Last updated: {{ git_revision_date_localized }}_

-----

## **For Contributors**

### Prerequisites

#### Knowledge Requirements

- Basic Python programming
- Understanding of networking concepts (TCP/IP, packets)
- Familiarity with Linux command line
- (Optional) Embedded C for STM32 development

#### Hardware Requirements

**Minimum Setup (Raspberry Pi only):**

- Raspberry Pi 4 (4GB RAM minimum, 8GB recommended)
- MicroSD card (32GB minimum, 64GB recommended)
- Power supply (USB-C, 5V/3A)
- Ethernet cable
- Computer for SSH access

**Full Setup (Pi + STM32):**

- All of the above, plus:
- STM32 NUCLEO-F756ZG development board
- USB cable (Type-A to Mini-B for STM32)

**Budget:** ~€125 total

#### Software Requirements

- Computer with Windows/Mac/Linux
- Internet connection (for downloads and cloud features)
- Git installed on your computer

-----

### Quick Start (20 Minutes)

#### Step 1: Clone Repository

```bash
git clone https://github.com/Sivaram91/Network-IDS-project.git
cd network-ids-project
```

#### Step 2: Hardware Setup

**Raspberry Pi:**

1. Flash Raspberry Pi OS to SD card (see [tools installation](tools_installation.md))
1. Insert SD card and boot Pi
1. Connect via SSH or monitor
1. Follow Raspberry Pi setup below

**STM32 (later):**

1. Connect via USB to computer
1. Install STM32CubeIDE
1. Follow STM32 setup guide (coming soon)

#### Step 3: Software Installation

See detailed instructions: **[Tools Installation Guide](tools_installation.md)**

-----

### Raspberry Pi Setup (Detailed)

#### 1. Prepare SD Card

**Download Raspberry Pi Imager and Flash OS:**

See "Download & Install" in **[Raspberry Pi Tools Section](tools_installation.md)**

#### 2. First Boot

**Option A: With Monitor & Keyboard**

1. Insert SD card into Pi
1. Connect monitor (HDMI), keyboard, mouse
1. Connect power
1. Wait for boot (~1 minute)
1. Complete setup wizard

**Option B: Headless (SSH)**

1. Insert SD card into Pi
1. Connect Ethernet cable to router
1. Connect power
1. Find Pi’s IP address (check router or use `ping raspberrypi.local`)
1. SSH from your computer:

```bash
ssh pi@raspberrypi.local
# or
ssh pi@<IP_ADDRESS>
```

#### 3. Initial Configuration & Project dependencies

See "Python Environment, Python Packages and System Tools" sections in **[Tools Installation](tools_installation.md)** Page

#### 5. Clone Project Repository

```bash
cd ~
git clone https://github.com/Sivaram91/Network-IDS-project.git
cd network-ids-project
```

#### 6. Test Setup

```bash
# Run setup verification script (when available)
python3 scripts/verify_setup.py

# Or manual test
python3 -c "import scapy, sklearn, pandas; print('All imports successful!')"
```

-----

### STM32 Setup (Coming Soon)

Detailed STM32 development environment setup will be added in Phase 1.

**What you’ll need:**

- STM32CubeIDE
- STM32CubeMX
- TensorFlow Lite Micro
- ST-Link drivers

-----

### Network Configuration

#### Connect Pi and STM32

**Direct Connection (Simplest):**

```
[Raspberry Pi] ←──Ethernet Cable──→ [STM32]
```

**Configure Static IPs:**

**On Raspberry Pi:**

```bash
sudo nano /etc/dhcpcd.conf

# Add at the end:
interface eth0
static ip_address=192.168.10.1/24
```

**On STM32 (in code):**

```c
IP_ADDRESS = 192.168.10.2
NETMASK = 255.255.255.0
```

-----

### Troubleshooting

#### Raspberry Pi Won’t Boot

- **Check:** Power supply (needs 5V/3A minimum)
- **Check:** SD card properly inserted
- **Check:** Green LED blinks? OS might be corrupted, reflash SD card

#### Cannot SSH to Pi

- **Check:** Pi and computer on same network
- **Try:** `ping raspberrypi.local`
- **Try:** Use IP address instead of hostname
- **Check:** SSH enabled during imaging

#### Permission Denied for Packet Capture

```bash
# Add user to wireshark group
sudo usermod -aG wireshark $USER

# Or run with sudo
sudo python3 your_script.py
```

#### Import Errors

```bash
# Reinstall dependencies
pip3 install --upgrade scapy pandas numpy scikit-learn
```

-----

### Next Steps

After completing setup:

1. **[Tools Installation](tools_installation.md)** - Verify all tools are working
1. **Run Hello World** - Test packet capture
1. **Explore Examples** - Check `/examples` folder
1. **Start Development** - Begin with data collection module

-----

### Getting Help

- **Issues:** [GitHub Issues](https://github.com/Sivaram91/Network-IDS-project/issues)
- **Email:** sivaram.07@gmail.com
- **Documentation:** Browse other docs pages

-----

**Ready to start?** Head to [Tools Installation](tools_installation.md) next!

-----

