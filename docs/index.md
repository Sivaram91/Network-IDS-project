# Network Intrusion Detection System with TinyML

**Status:** 🟢 Phase 1 - In Progress 
**Version:** 0.1.0-dev 
**Last Updated:** January 31, 2025

-----

[TOC]

## 🎯 Project Overview

A dual-layer security system combining Machine Learning and TinyML for real-time network intrusion detection, with applications in automotive and IoT security.

### Architecture

```
┌─────────────────┐         ┌──────────────────────┐
│ STM32F756       │◄───────►│ Raspberry Pi 4       │
│ Gateway +       │ Ethernet│ Full ML IDS +        │
│ TinyML          │         │ Attack Simulator     │
└─────────────────┘         └──────────────────────┘
```

**Left Side (Edge):** Fuzzing detection using TinyML (<100KB model) 
**Right Side (Cloud):** Full network traffic analysis using ML

-----

## 🚀 Quick Links

- **[Getting Started](getting_started.md)** - Setup your environment
- **[Tools Installation](tools_installation.md)** - Required software
- **[GitHub Repository](https://github.com/Sivaram91/Network-IDS-project)** - Source code
- **Project Board** - Task tracking (link when ready)

-----

## 📚 What You’ll Learn

### Machine Learning

- Network traffic feature engineering
- Supervised classification (Random Forest)
- Unsupervised anomaly detection (Isolation Forest)
- Model evaluation and optimization

### TinyML (Embedded ML)

- TensorFlow Lite Micro on microcontrollers
- Model quantization for resource-constrained devices
- Edge inference optimization

### Cybersecurity

- Network intrusion detection techniques
- Attack simulation (port scanning, DoS, fuzzing)
- Threat modeling (TARA)
- Secure firmware updates (FOTA)

### Embedded Systems

- STM32 development
- Ethernet communication
- Real-time processing
- Hardware security (future: Root of Trust, HSM)

-----

## 🛠️ Technology Stack

### Hardware

|Component |Model |Purpose |
|---------------------|--------------------|----------------------------|
|Microcontroller |STM32F756ZG (NUCLEO)|Gateway + TinyML |
|Single Board Computer|Raspberry Pi 4 (8GB)|Full ML + IDS |
|Connectivity |Ethernet + WiFi |Device communication + cloud|

### Software

|Layer |Technology |Purpose |
|------------|---------------------|-------------------|
|ML Framework|Scikit-learn |Model training (Pi)|
|TinyML |TensorFlow Lite Micro|Inference (STM32) |
|Network |Scapy |Packet capture |
|Language |Python 3.9+ |Pi development |
|Embedded |C |STM32 firmware |
|CI/CD |GitHub Actions |Automation |

-----

## 📅 Project Phases

### ✅ Phase 0: Planning (Complete)

- Requirements definition
- Architecture design
- Hardware selection

### 🔄 Phase 1: Core Functionality (Current - Weeks 1-6)

- [x] Hardware procurement
- [x] Repository setup
- [ ] Raspberry Pi IDS implementation
- [ ] STM32 TinyML implementation
- [ ] System integration
- [ ] Testing & validation

**Target:** March 15, 2026

### ⏳ Phase 2: Professional Infrastructure (Weeks 7-10)

- CI/CD pipeline
- Comprehensive documentation
- Demo video
- Portfolio preparation

### ⏳ Phase 3: Cloud Integration (Future)

- WiFi connectivity
- Real-time dashboard (Grafana)
- Alert system
- Remote monitoring

### ⏳ Phase 4: AUTOSAR & Advanced Features (Future)

- Classic AUTOSAR (STM32)
- Adaptive AUTOSAR (Pi)
- Yocto Linux
- Secure FOTA system

-----

## 🎯 Success Criteria

**Phase 1 Goals:**

- [ ] Detect 3+ attack types with >90% accuracy
- [ ] False positive rate < 5%
- [ ] TinyML model < 100KB
- [ ] Real-time latency < 100ms
- [ ] Complete test coverage

-----

## 👤 About

**Author:** Sivaramasubramanian Sundararaj 
**Background:** 13+ years embedded software development | AUTOSAR architect | Bootloader specialist 
**Location:** Gärtringen, Germany 
**Email:** sivaram.07@gmail.com

-----

## 📄 License

Educational and portfolio project. 
Copyright © 2025 Sivaramasubramanian Sundararaj

-----

**Last Updated:** January 31, 2025
