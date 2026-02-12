
# NETWORK INTRUSION DETECTION SYSTEM WITH TINYML
## RELEASE PLAN

Project: Network IDS with TinyML
Author: Sivaramasubramanian Sundararaj
Document Version: 1.0

_Last updated: {{ git_revision_date_localized }}_

----

## RELEASE OVERVIEW

Total Releases: 5 (4 core phases + 1 RAG enhancement)
Timeline: February 2025 - February 2026 (13 months)
Total Features: 12
Total Story Points Estimate: 450 hours

### Release Schedule:
- Release 1 (Phase 1): February - May 2025 (4 months)
- Release 2 (Phase 2): June 2025 (1 month)
- Release 3 (Phase 3): July - August 2025 (2 months)
- Release 4 (Phase 4): September - November 2025 (3 months)
- Release 5 (RAG): December 2025 - February 2026 (3 months)

#### RELEASE 1: CORE FUNCTIONALITY (PHASE 1)

Release Date: May 31, 2025
Duration: 4 months (February - May 2025)
Effort: 150 hours
Goal: Portfolio-ready working intrusion detection system

##### Features Included:
- FEAT-001: Network Traffic Capture
- FEAT-002: ML-based Intrusion Detection
- FEAT-003: TinyML Fuzzing Detection
- FEAT-004: Attack Simulation
- FEAT-005: System Integration

##### Success Criteria:
[x] Raspberry Pi captures and analyzes network traffic
[x] ML model detects 3+ attack types with >90% accuracy
[x] STM32 detects fuzzing attacks using TinyML
[x] System demonstrates end-to-end detection capability
[x] Complete documentation available
[x] Demo video created

##### EPIC 1.1: NETWORK TRAFFIC CAPTURE (FEAT-001)

Epic Owner: Sivaramasubramanian Sundararaj
Priority: Critical
Effort Estimate: 30 hours
Dependencies: Hardware setup complete

User Story: As a security analyst, I want to capture network traffic in real-time
so that I can analyze it for potential threats.

Acceptance Criteria:
- System captures minimum 100 packets per second
- All packet metadata extracted correctly
- PCAP files generated for offline analysis
- System handles storage limitations gracefully

Stories (Tasks):

STORY 1.1.1: Hardware Setup
-------------------------
Description: Setup Raspberry Pi 4 with required OS and network configuration
Effort: 4 hours
Tasks:
- Flash Raspberry Pi OS to SD card
- Configure SSH access
- Setup static IP addressing
- Install system updates
- Configure Ethernet interface
Acceptance: Pi boots successfully and accessible via SSH

STORY 1.1.2: Python Environment Setup
---------------------------------
Description: Install and configure Python packages for packet capture
Effort: 3 hours
Tasks:
- Install Python 3.9+
- Install Scapy library
- Install pandas, numpy
- Verify packet capture permissions
- Test basic Scapy functionality
Acceptance: All imports successful, test capture works

STORY 1.1.3: Packet Capture Module
-----------------------------
Description: Implement real-time packet capture functionality
Effort: 8 hours
Tasks:
- Create PacketCapture class
- Implement sniff callback function
- Add packet parsing logic
- Extract IP, port, protocol, flags
- Implement packet buffering
- Add error handling
Acceptance: Captures 100+ pps with all fields extracted

STORY 1.1.4: PCAP File Writer
------------------------
Description: Save captured packets to PCAP format
Effort: 4 hours
Tasks:
- Implement PCAP writer using Scapy
- Add file rotation mechanism
- Implement file naming convention (timestamp-based)
- Add metadata headers
Acceptance: Generated PCAP opens in Wireshark correctly

STORY 1.1.5: Storage Management
--------------------------
Description: Implement circular buffer for storage management
Effort: 6 hours
Tasks:
- Monitor disk space usage
- Implement circular buffer mechanism
- Delete oldest files when >80% full
- Add logging for storage events
- Test with limited storage
Acceptance: System runs 24h without storage failure

STORY 1.1.6: Unit Tests
------------------
Description: Create unit tests for capture module
Effort: 5 hours
Tasks:
- Test packet parsing accuracy
- Test PCAP file generation
- Test storage management
- Test error handling
- Achieve 80% code coverage
Acceptance: All tests pass, coverage >80%

##### EPIC 1.2: ML-BASED INTRUSION DETECTION (FEAT-002)

Epic Owner: Sivaramasubramanian Sundararaj
Priority: Critical
Effort Estimate: 40 hours
Dependencies: EPIC 1.1 complete

User Story: As a network administrator, I want the system to automatically detect
network attacks using machine learning so that I can respond to threats quickly.

Acceptance Criteria:
- Detects port scanning with >90% accuracy
- Detects DoS attacks with >90% accuracy
- Detects data exfiltration with >85% accuracy
- False positive rate <5%
- Real-time alerts generated within 100ms

Stories (Tasks):

STORY 1.2.1: Feature Engineering Design
----------------------------------
Description: Design and document feature extraction strategy
Effort: 5 hours
Tasks:
- Research network flow features
- Define feature list (packet count, byte count, timing, etc.)
- Design time window mechanism
- Document feature rationale
Acceptance: Feature specification document complete

STORY 1.2.2: Feature Extraction Module
---------------------------------
Description: Implement feature extraction from packet data
Effort: 10 hours
Tasks:
- Create FeatureExtractor class
- Implement flow aggregation (5-tuple)
- Calculate statistical features (mean, std, entropy)
- Implement time windowing (configurable)
- Extract protocol-specific features (TCP flags)
- Validate feature correctness
Acceptance: All features extracted correctly for test flows

STORY 1.2.3: Training Data Collection
--------------------------------
Description: Collect and label training dataset
Effort: 6 hours
Tasks:
- Capture normal traffic (home network)
- Generate attack traffic (port scan, DoS, exfiltration)
- Label dataset (normal vs attack type)
- Split into train/validation/test sets
- Save dataset to CSV
Acceptance: Labeled dataset with 1000+ samples per class

STORY 1.2.4: ML Model Training
-------------------------
Description: Train machine learning models
Effort: 8 hours
Tasks:
- Implement Random Forest classifier
- Implement Isolation Forest (anomaly detection)
- Feature scaling/normalization
- Hyperparameter tuning
- Cross-validation
- Model evaluation (accuracy, precision, recall)
Acceptance: Models achieve >90% accuracy on validation set

STORY 1.2.5: Real-time Detection Engine
----------------------------------
Description: Implement real-time detection using trained models
Effort: 8 hours
Tasks:
- Create DetectionEngine class
- Load trained models
- Implement sliding window processing
- Generate alerts on detection
- Measure latency (target <100ms)
- Add logging
Acceptance: Real-time detection working with <100ms latency

STORY 1.2.6: Model Persistence
-------------------------
Description: Save and load trained models
Effort: 3 hours
Tasks:
- Implement model serialization (joblib)
- Version control for models
- Load model at startup
- Handle model loading errors
Acceptance: Models persist across restarts

##### EPIC 1.3: TINYML FUZZING DETECTION (FEAT-003)

Epic Owner: Sivaramasubramanian Sundararaj
Priority: Critical
Effort Estimate: 40 hours
Dependencies: STM32 hardware available

User Story: As an embedded systems engineer, I want to detect malformed packets
on the STM32 gateway using TinyML so that I can provide edge-level security.

Acceptance Criteria:
- TinyML model <100KB
- Inference latency <10ms per packet
- RAM usage <50KB
- Detection accuracy >85% for fuzzing attacks

Stories (Tasks):

STORY 1.3.1: STM32 Development Environment
-------------------------------------
Description: Setup STM32 development tools and test basic functionality
Effort: 6 hours
Tasks:
- Install STM32CubeIDE
- Install ST-Link drivers
- Create new project for NUCLEO-H755ZI
- Configure clock settings
- Test GPIO (LED blink)
- Test UART debug output
Acceptance: LED blinks, debug messages visible

STORY 1.3.2: Ethernet Driver Setup
-----------------------------
Description: Configure Ethernet peripheral on STM32
Effort: 8 hours
Tasks:
- Configure Ethernet peripheral in CubeMX
- Initialize Ethernet MAC and PHY
- Implement basic packet reception
- Setup static IP (192.168.10.2)
- Test ping from Raspberry Pi
- Debug Ethernet issues
Acceptance: STM32 responds to ping from Pi

STORY 1.3.3: TensorFlow Lite Micro Integration
-----------------------------------------
Description: Integrate TFLite Micro into STM32 project
Effort: 8 hours
Tasks:
- Download TFLite Micro library
- Add to STM32 project
- Configure build settings
- Test with example model
- Verify compilation
- Measure memory footprint
Acceptance: Example TFLite model runs on STM32

STORY 1.3.4: Fuzzing Detection Model Training
----------------------------------------
Description: Train lightweight model for fuzzing detection
Effort: 6 hours
Tasks:
- Generate fuzzing attack dataset (malformed packets)
- Design lightweight model architecture
- Train on laptop (Keras)
- Quantize to int8
- Convert to TFLite format
- Verify model size <100KB
Acceptance: Quantized TFLite model <100KB, accuracy >85%

STORY 1.3.5: On-Device Inference
---------------------------
Description: Implement inference on STM32
Effort: 8 hours
Tasks:
- Load TFLite model to STM32 flash
- Extract features from incoming packets
- Run inference using TFLite interpreter
- Measure inference latency
- Optimize for <10ms latency
- Measure RAM usage
Acceptance: Inference <10ms, RAM <50KB

STORY 1.3.6: Testing and Validation
------------------------------
Description: Test TinyML detection on real traffic
Effort: 4 hours
Tasks:
- Send normal packets from Pi
- Send fuzzing attacks from Pi
- Verify detection accuracy
- Test edge cases
- Performance benchmarking
Acceptance: >85% accuracy on test set

--------------------------------------------------------------------------------
EPIC 1.4: ATTACK SIMULATION (FEAT-004)
--------------------------------------------------------------------------------

Epic Owner: Sivaramasubramanian Sundararaj
Priority: High
Effort Estimate: 20 hours
Dependencies: Network setup complete

User Story: As a tester, I want to generate various network attacks so that I
can validate the detection capabilities of the system.

Acceptance Criteria:
- Port scan simulation (configurable rate)
- DoS attack simulation (high packet rate)
- Fuzzing attack simulation (malformed packets)
- Data exfiltration simulation
- All attacks logged with parameters

Stories (Tasks):

STORY 1.4.1: Attack Simulator Framework
----------------------------------
Description: Create framework for attack simulation
Effort: 4 hours
Tasks:
- Create AttackSimulator class
- Define attack interface
- Implement logging mechanism
- Add configuration parser
Acceptance: Framework structure complete

STORY 1.4.2: Port Scan Simulator
---------------------------
Description: Implement port scanning attack generator
Effort: 4 hours
Tasks:
- Implement SYN scan (TCP)
- Make port range configurable
- Make scan rate configurable (1-1000 ports/sec)
- Log scan parameters
- Verify with Wireshark
Acceptance: Port scan detectable by IDS

STORY 1.4.3: DoS Attack Simulator
----------------------------
Description: Generate DoS attack traffic
Effort: 4 hours
Tasks:
- Implement high-rate packet generation
- Target configurable IP/port
- Configurable packet rate (up to 1000 pps)
- Multiple source IPs (spoofing)
- Log attack parameters
Acceptance: DoS attack detectable by IDS

STORY 1.4.4: Fuzzing Attack Simulator
--------------------------------
Description: Generate malformed packets for fuzzing
Effort: 4 hours
Tasks:
- Generate packets with invalid length
- Corrupt packet headers
- Invalid checksums
- Random payload data
- Log fuzzing parameters
Acceptance: Fuzzing detectable by STM32 TinyML

STORY 1.4.5: Data Exfiltration Simulator
-----------------------------------
Description: Simulate data exfiltration pattern
Effort: 4 hours
Tasks:
- Generate sustained upload traffic
- Large packet sizes (near MTU)
- Configurable target IP
- Realistic timing patterns
- Log exfiltration parameters
Acceptance: Exfiltration detectable by ML model

--------------------------------------------------------------------------------
EPIC 1.5: SYSTEM INTEGRATION (FEAT-005)
--------------------------------------------------------------------------------

Epic Owner: Sivaramasubramanian Sundararaj
Priority: Critical
Effort Estimate: 20 hours
Dependencies: EPIC 1.2, 1.3 complete

User Story: As a system integrator, I want Raspberry Pi and STM32 to communicate
reliably so that alerts can be shared and correlated.

Acceptance Criteria:
- Reliable TCP/IP communication
- Alert delivery <50ms
- Automatic reconnection on failure
- Static IP configuration

Stories (Tasks):

STORY 1.5.1: Communication Protocol Design
-------------------------------------
Description: Design message format and protocol
Effort: 3 hours
Tasks:
- Define message structure (JSON/binary)
- Design alert format
- Define acknowledgment mechanism
- Document protocol specification
Acceptance: Protocol documented and reviewed

STORY 1.5.2: Raspberry Pi Communication Module
-----------------------------------------
Description: Implement Pi-side communication
Effort: 5 hours
Tasks:
- Create TCP client (Pi connects to STM32)
- Implement message serialization
- Add retry logic
- Handle disconnections
- Test with mock server
Acceptance: Pi sends/receives messages reliably

STORY 1.5.3: STM32 Communication Module
----------------------------------
Description: Implement STM32-side communication
Effort: 6 hours
Tasks:
- Create TCP server on STM32
- Implement message parsing
- Handle multiple connections (if needed)
- Add error handling
- Test with mock client
Acceptance: STM32 receives/sends messages reliably

STORY 1.5.4: Alert Propagation
-------------------------
Description: Implement alert sharing between devices
Effort: 4 hours
Tasks:
- STM32 sends fuzzing alerts to Pi
- Pi receives and logs STM32 alerts
- Measure alert latency
- Correlate alerts (if both detect same attack)
Acceptance: Alert delivery <50ms, no packet loss

STORY 1.5.5: Integration Testing
---------------------------
Description: End-to-end system integration testing
Effort: 2 hours
Tasks:
- Test full detection flow
- Test with simulated attacks
- Test reconnection after cable disconnect
- Stress test (multiple attacks simultaneously)
Acceptance: All integration tests pass

================================================================================
RELEASE 2: PROFESSIONAL INFRASTRUCTURE (PHASE 2)
================================================================================

Release Date: June 30, 2025
Duration: 1 month (June 2025)
Effort: 40 hours
Goal: Production-grade code quality and automation

Features Included:
- FEAT-006: Testing Infrastructure

Success Criteria:
[x] CI/CD pipeline operational
[x] Unit test coverage >80%
[x] Static analysis passing (score >8.0)
[x] Automated builds on every commit
[x] Professional documentation

--------------------------------------------------------------------------------
EPIC 2.1: TESTING INFRASTRUCTURE (FEAT-006)
--------------------------------------------------------------------------------

Epic Owner: Sivaramasubramanian Sundararaj
Priority: High
Effort Estimate: 40 hours
Dependencies: Phase 1 complete

User Story: As a developer, I want automated testing and CI/CD so that code
quality is maintained and regressions are prevented.

Acceptance Criteria:
- 80%+ code coverage
- All tests pass on every commit
- Code quality score >8.0/10
- Build artifacts generated automatically

Stories (Tasks):

STORY 2.1.1: Unit Test Framework
---------------------------
Description: Setup unit testing framework
Effort: 6 hours
Tasks:
- Install pytest
- Create test directory structure
- Write tests for capture module
- Write tests for feature extraction
- Write tests for detection engine
- Configure code coverage (pytest-cov)
Acceptance: Test suite runs, coverage report generated

STORY 2.1.2: Integration Tests
-------------------------
Description: Create integration test suite
Effort: 8 hours
Tasks:
- Test end-to-end packet flow
- Test Pi-STM32 communication
- Test attack detection scenarios
- Mock external dependencies
- Test error handling paths
Acceptance: Integration tests pass

STORY 2.1.3: GitHub Actions Workflow
-------------------------------
Description: Setup CI/CD pipeline
Effort: 8 hours
Tasks:
- Create .github/workflows/ci.yml
- Configure Python environment
- Run linting (Pylint, Flake8)
- Run unit tests
- Generate coverage report
- Fail build on quality issues
Acceptance: Workflow runs on every push

STORY 2.1.4: Static Code Analysis
----------------------------
Description: Integrate code quality tools
Effort: 4 hours
Tasks:
- Configure Pylint
- Configure Flake8
- Set quality thresholds
- Fix existing issues
- Document coding standards
Acceptance: Code quality score >8.0

STORY 2.1.5: STM32 Build Automation
------------------------------
Description: Automate STM32 firmware builds
Effort: 6 hours
Tasks:
- Setup arm-gcc toolchain in CI
- Create build script
- Compile firmware in pipeline
- Generate .bin/.hex artifacts
- Archive build outputs
Acceptance: Firmware builds automatically

STORY 2.1.6: Documentation Generation
--------------------------------
Description: Auto-generate API documentation
Effort: 4 hours
Tasks:
- Setup Sphinx (Python docs)
- Add docstrings to all modules
- Configure auto-build
- Deploy to GitHub Pages
Acceptance: API docs auto-published

STORY 2.1.7: Test Reporting
----------------------
Description: Generate test reports
Effort: 4 hours
Tasks:
- Create test report template
- Document test results
- Generate coverage badges
- Add to README
Acceptance: Test results visible in README

================================================================================
RELEASE 3: CLOUD INTEGRATION (PHASE 3)
================================================================================

Release Date: August 31, 2025
Duration: 2 months (July - August 2025)
Effort: 60 hours
Goal: Cloud connectivity and remote monitoring

Features Included:
- FEAT-007: Cloud Connectivity
- FEAT-008: Dashboard & Monitoring

Success Criteria:
[x] WiFi connectivity stable
[x] Alerts uploaded to cloud
[x] Real-time dashboard operational
[x] Email notifications working
[x] 24/7 uptime capability

--------------------------------------------------------------------------------
EPIC 3.1: CLOUD CONNECTIVITY (FEAT-007)
--------------------------------------------------------------------------------

Epic Owner: Sivaramasubramanian Sundararaj
Priority: Medium
Effort Estimate: 30 hours
Dependencies: Phase 2 complete

User Story: As a security analyst, I want alerts sent to the cloud so that I
can monitor the system remotely from anywhere.

Acceptance Criteria:
- WiFi connection stable (24h uptime)
- Alerts uploaded within 5 seconds
- Local buffering when offline
- Automatic upload on reconnection

Stories (Tasks):

STORY 3.1.1: WiFi Configuration
--------------------------
Description: Setup WiFi on Raspberry Pi
Effort: 3 hours
Tasks:
- Configure WiFi credentials
- Test WiFi connectivity
- Implement automatic reconnection
- Monitor connection quality
Acceptance: WiFi stable for 24 hours

STORY 3.1.2: Cloud Service Selection
-------------------------------
Description: Choose and setup cloud platform
Effort: 4 hours
Tasks:
- Evaluate options (AWS IoT, Azure IoT, ThingSpeak)
- Create free tier account
- Setup IoT endpoint
- Configure authentication
- Test connection
Acceptance: Cloud endpoint reachable from Pi

STORY 3.1.3: Alert Upload Module
---------------------------
Description: Implement cloud data upload
Effort: 8 hours
Tasks:
- Create CloudUploader class
- Implement HTTP POST to cloud endpoint
- Format alert data (JSON)
- Add authentication headers
- Measure upload latency
- Handle upload failures
Acceptance: Alerts uploaded within 5 seconds

STORY 3.1.4: Offline Buffering
-------------------------
Description: Buffer alerts when cloud unavailable
Effort: 6 hours
Tasks:
- Implement local SQLite database
- Store alerts when offline
- Detect connection restoration
- Batch upload buffered alerts
- Delete uploaded alerts
Acceptance: No data loss during outages

STORY 3.1.5: Network Monitoring
--------------------------
Description: Monitor network health
Effort: 5 hours
Tasks:
- Track WiFi signal strength
- Monitor packet loss
- Log connection events
- Alert on connection issues
Acceptance: Network health metrics logged

STORY 3.1.6: Cloud Integration Testing
---------------------------------
Description: Test cloud connectivity end-to-end
Effort: 4 hours
Tasks:
- Test with various attack types
- Test offline buffering (simulate outage)
- Stress test (many alerts)
- Verify data integrity in cloud
Acceptance: All cloud tests pass

--------------------------------------------------------------------------------
EPIC 3.2: DASHBOARD & MONITORING (FEAT-008)
--------------------------------------------------------------------------------

Epic Owner: Sivaramasubramanian Sundararaj
Priority: Medium
Effort Estimate: 30 hours
Dependencies: EPIC 3.1 complete

User Story: As a security analyst, I want a real-time dashboard so that I can
visualize system status and attack trends.

Acceptance Criteria:
- Dashboard updates in real-time
- Shows key metrics (alert count, system health)
- Email notifications for critical alerts
- Accessible from any device

Stories (Tasks):

STORY 3.2.1: Dashboard Platform Selection
------------------------------------
Description: Choose and setup dashboard tool
Effort: 3 hours
Tasks:
- Evaluate options (Grafana, custom web app)
- Install Grafana or setup Flask app
- Configure data source
- Test basic visualization
Acceptance: Dashboard platform ready

STORY 3.2.2: System Status Panel
---------------------------
Description: Display real-time system status
Effort: 6 hours
Tasks:
- Create status panel
- Show Pi CPU/memory usage
- Show STM32 status
- Show network connectivity
- Auto-refresh every 5 seconds
Acceptance: Status updates in real-time

STORY 3.2.3: Alert Visualization
---------------------------
Description: Display alerts and statistics
Effort: 8 hours
Tasks:
- Create alert timeline chart
- Show attack type distribution (pie chart)
- Display alert count by severity
- Show detection accuracy metrics
- Add time range filter
Acceptance: All charts render correctly

STORY 3.2.4: Email Notification System
---------------------------------
Description: Send email alerts for critical events
Effort: 6 hours
Tasks:
- Setup SMTP configuration
- Create email templates
- Implement alert logic (when to email)
- Add rate limiting (avoid spam)
- Test email delivery
Acceptance: Emails received within 1 minute

STORY 3.2.5: Mobile Responsiveness
-----------------------------
Description: Make dashboard mobile-friendly
Effort: 4 hours
Tasks:
- Responsive CSS design
- Test on mobile devices
- Optimize for small screens
Acceptance: Dashboard usable on phone

STORY 3.2.6: Dashboard Deployment
----------------------------
Description: Deploy dashboard for remote access
Effort: 3 hours
Tasks:
- Configure firewall rules
- Setup HTTPS (Let's Encrypt)
- Test remote access
- Document access instructions
Acceptance: Dashboard accessible remotely

================================================================================
RELEASE 4: ADVANCED FEATURES (PHASE 4)
================================================================================

Release Date: November 30, 2025
Duration: 3 months (September - November 2025)
Effort: 100 hours
Goal: Enterprise-grade automotive features

Features Included:
- FEAT-009: AUTOSAR Integration
- FEAT-010: Secure FOTA
- FEAT-011: Security Hardening

Success Criteria:
[x] AUTOSAR architecture implemented
[x] Secure firmware updates working
[x] Root of Trust established
[x] All security features operational

--------------------------------------------------------------------------------
EPIC 4.1: AUTOSAR INTEGRATION (FEAT-009)
--------------------------------------------------------------------------------

Epic Owner: Sivaramasubramanian Sundararaj
Priority: Medium
Effort Estimate: 40 hours
Dependencies: Phase 3 complete

User Story: As an automotive software architect, I want to demonstrate AUTOSAR
implementation so that I can showcase automotive software expertise.

Acceptance Criteria:
- Classic AUTOSAR on STM32 (BSW, RTE, ASW layers)
- Adaptive AUTOSAR concepts on Pi
- Service-oriented architecture

Stories (Tasks):

STORY 4.1.1: Classic AUTOSAR Architecture Design
-------------------------------------------
Description: Design Classic AUTOSAR layering for STM32
Effort: 6 hours
Tasks:
- Define BSW modules (Ethernet driver, diagnostics)
- Design RTE interfaces
- Define ASW components
- Document architecture
Acceptance: Architecture diagram complete

STORY 4.1.2: BSW Layer Implementation
--------------------------------
Description: Implement Basic Software layer
Effort: 12 hours
Tasks:
- Refactor Ethernet driver as BSW module
- Implement ECUM (ECU State Manager)
- Implement COM module
- Add diagnostic services (UDS basic)
- Follow AUTOSAR naming conventions
Acceptance: BSW modules functional

STORY 4.1.3: RTE Configuration
-------------------------
Description: Implement Runtime Environment
Effort: 8 hours
Tasks:
- Define RTE interfaces
- Generate RTE code (or manual implementation)
- Connect BSW to ASW via RTE
Acceptance: RTE connects BSW and ASW

STORY 4.1.4: ASW Components
----------------------
Description: Implement Application Software
Effort: 6 hours
Tasks:
- Create SWCs for TinyML inference
- Create SWC for alert handling
- Implement runnable entities
- Follow AUTOSAR patterns
Acceptance: ASW components functional

STORY 4.1.5: Adaptive AUTOSAR on Pi
------------------------------
Description: Implement Adaptive AUTOSAR concepts
Effort: 8 hours
Tasks:
- Implement ara::com communication
- Create service interfaces
- Implement service discovery
- SOME/IP protocol (basic)
Acceptance: Services communicate via ara::com

--------------------------------------------------------------------------------
EPIC 4.2: SECURE FOTA (FEAT-010)
--------------------------------------------------------------------------------

Epic Owner: Sivaramasubramanian Sundararaj
Priority: Medium
Effort Estimate: 30 hours
Dependencies: Cloud connectivity working

User Story: As a system maintainer, I want to update firmware remotely so that
I can deploy fixes and improvements without physical access.

Acceptance Criteria:
- OTA updates for Pi and STM32
- Cryptographic signature verification
- A/B partition scheme for rollback
- Update success rate >95%

Stories (Tasks):

STORY 4.2.1: Pi A/B Partitioning
---------------------------
Description: Setup dual-partition boot on Pi
Effort: 6 hours
Tasks:
- Create two root partitions
- Configure bootloader for A/B
- Implement partition switching
- Test rollback mechanism
Acceptance: Pi boots from A or B partition

STORY 4.2.2: Update Package Format
-----------------------------
Description: Define update package structure
Effort: 3 hours
Tasks:
- Design update manifest (version, hash, signature)
- Package firmware binary
- Add metadata
- Document format
Acceptance: Update package specification complete

STORY 4.2.3: Signature Generation & Verification
-------------------------------------------
Description: Implement cryptographic signing
Effort: 8 hours
Tasks:
- Generate RSA key pair
- Sign update packages
- Implement signature verification on Pi
- Reject unsigned/tampered packages
- Test with invalid signatures
Acceptance: Only valid signed updates accepted

STORY 4.2.4: Pi Update Manager
-------------------------
Description: Implement OTA update on Pi
Effort: 6 hours
Tasks:
- Download update from cloud
- Verify signature
- Install to inactive partition
- Switch boot partition
- Reboot and verify
Acceptance: Pi updates successfully

STORY 4.2.5: STM32 Bootloader
------------------------
Description: Implement secure bootloader on STM32
Effort: 10 hours
Tasks:
- Create bootloader in flash sector 0
- Implement UART/Ethernet update protocol
- Verify application signature before boot
- Jump to application if valid
Acceptance: STM32 only boots signed firmware

STORY 4.2.6: Remote STM32 Update
---------------------------
Description: Update STM32 from Raspberry Pi
Effort: 7 hours
Tasks:
- Pi downloads STM32 firmware
- Pi sends firmware to STM32 bootloader
- STM32 verifies and flashes
- STM32 reboots with new firmware
Acceptance: STM32 updated remotely from Pi

--------------------------------------------------------------------------------
EPIC 4.3: SECURITY HARDENING (FEAT-011)
--------------------------------------------------------------------------------

Epic Owner: Sivaramasubramanian Sundararaj
Priority: High
Effort Estimate: 30 hours
Dependencies: Hardware (TPM chip) available

User Story: As a security engineer, I want robust security mechanisms so that
the system is protected against attacks and tampering.

Acceptance Criteria:
- Secure boot chain verified
- Cryptographic keys in HSM
- Encrypted communication (TLS)
- Anti-tampering detection

Stories (Tasks):

STORY 4.3.1: Secure Boot on STM32
----------------------------
Description: Implement secure boot chain
Effort: 8 hours
Tasks:
- Configure secure boot in STM32
- Generate root key
- Sign bootloader
- Sign application
- Test boot verification
- Test with invalid signature
Acceptance: STM32 refuses tampered firmware

STORY 4.3.2: HSM Integration (TPM/ATECC608)
-------------------------------------
Description: Integrate hardware security module
Effort: 10 hours
Tasks:
- Connect ATECC608 via I2C
- Initialize TPM
- Generate key pair in TPM
- Store private key in TPM (never exposed)
- Use TPM for signing operations
- Test key security
Acceptance: Private keys never readable from software

STORY 4.3.3: TLS Encryption
----------------------
Description: Encrypt Pi-STM32 communication
Effort: 8 hours
Tasks:
- Implement TLS 1.3 on Pi (using Python SSL)
- Implement TLS on STM32 (mbedTLS)
- Exchange certificates
- Test encrypted traffic (Wireshark)
- Verify decryption fails without keys
Acceptance: All traffic encrypted

STORY 4.3.4: Anti-Tampering Detection
--------------------------------
Description: Detect physical tampering attempts
Effort: 4 hours
Tasks:
- Monitor voltage levels (detect glitching)
- Detect debug probe attachment
- Wipe keys on tamper detection
- Test with simulated tampering
Acceptance: Keys erased on tamper event

================================================================================
RELEASE 5: RAG DOCUMENTATION ASSISTANT (PHASE 5)
================================================================================

Release Date: February 28, 2026
Duration: 3 months (December 2025 - February 2026)
Effort: 80 hours
Goal: AI-powered project documentation assistant

Features Included:
- FEAT-012: RAG Documentation System

Success Criteria:
[x] RAG system indexes all project artifacts
[x] Natural language Q&A working
[x] Response accuracy >90%
[x] Public demo accessible
[x] Integrated with project portfolio

--------------------------------------------------------------------------------
EPIC 5.1: RAG DOCUMENTATION SYSTEM (FEAT-012)
--------------------------------------------------------------------------------

Epic Owner: Sivaramasubramanian Sundararaj
Priority: Low (Enhancement)
Effort Estimate: 80 hours
Dependencies: Project documentation complete

User Story: As a project visitor, I want to ask questions about the project in
natural language so that I can understand the implementation details easily.

Acceptance Criteria:
- Answers questions about code, architecture, requirements
- Retrieves relevant code snippets
- References datasheets when needed
- Deployed as public demo

Stories (Tasks):

STORY 5.1.1: RAG Architecture Design
-------------------------------
Description: Design RAG system architecture
Effort: 4 hours
Tasks:
- Research RAG frameworks (LangChain, LlamaIndex)
- Choose vector database (ChromaDB, Pinecone)
- Define data sources
- Design query flow
- Document architecture
Acceptance: Architecture design complete

STORY 5.1.2: Data Collection & Preparation
-------------------------------------
Description: Collect and prepare all project artifacts
Effort: 8 hours
Tasks:
- Collect all markdown documentation
- Extract code comments
- Download hardware datasheets (PDFs)
- Extract requirements from CSV
- Clean and structure data
- Create metadata (source, category, date)
Acceptance: All data sources collected and organized

STORY 5.1.3: Document Chunking
-------------------------
Description: Split documents into chunks for embedding
Effort: 6 hours
Tasks:
- Implement text chunking (500-1000 tokens)
- Preserve code block integrity
- Handle PDF extraction (PyPDF2)
- Maintain document context
- Generate chunk metadata
Acceptance: All documents chunked appropriately

STORY 5.1.4: Vector Database Setup
-----------------------------
Description: Setup and configure vector database
Effort: 6 hours
Tasks:
- Install ChromaDB (or chosen DB)
- Generate embeddings (OpenAI or sentence-transformers)
- Index all document chunks
- Test similarity search
- Optimize retrieval performance
Acceptance: All documents indexed and searchable

STORY 5.1.5: RAG Query Engine
------------------------
Description: Implement query processing and retrieval
Effort: 10 hours
Tasks:
- Implement LangChain RAG chain
- Configure Claude API integration
- Implement semantic search
- Retrieve top-k relevant chunks
- Format context for LLM
- Generate responses
Acceptance: RAG answers questions correctly

STORY 5.1.6: Code Retrieval Enhancement
----------------------------------
Description: Add code-specific retrieval
Effort: 8 hours
Tasks:
- Index code by function/class
- Add syntax highlighting in responses
- Link to GitHub source
- Show line numbers
- Handle code-specific queries
Acceptance: Code snippets retrieved with context

STORY 5.1.7: Traceability Queries
----------------------------
Description: Enable requirements traceability queries
Effort: 6 hours
Tasks:
- Parse requirements.csv into structured format
- Implement traceability lookups
- Link requirements to code/tests
- Show impact analysis
Acceptance: Traceability queries working

STORY 5.1.8: Web Interface
---------------------
Description: Create user interface for RAG system
Effort: 12 hours
Tasks:
- Build Streamlit web app
- Create chat interface
- Add conversation history
- Show retrieved sources
- Display code with syntax highlighting
- Make mobile-responsive
Acceptance: Web UI functional and attractive

STORY 5.1.9: Deployment
------------------
Description: Deploy RAG system publicly
Effort: 6 hours
Tasks:
- Deploy to Streamlit Cloud (free tier)
- Configure environment variables
- Test public access
- Optimize load time
- Add usage analytics
Acceptance: RAG publicly accessible

STORY 5.1.10: RAG Documentation
--------------------------
Description: Document RAG system
Effort: 4 hours
Tasks:
- Write RAG architecture doc
- Document data sources
- Create usage guide
- Add to project portfolio
- Update CV/LinkedIn
Acceptance: RAG fully documented

STORY 5.1.11: Integration with Portfolio
-----------------------------------
Description: Integrate RAG into project showcase
Effort: 4 hours
Tasks:
- Add RAG link to project README
- Create demo video
- Generate QR code for CV
- Add to GitHub Pages
Acceptance: RAG linked from all project materials

STORY 5.1.12: Testing & Refinement
-----------------------------
Description: Test and improve RAG responses
Effort: 6 hours
Tasks:
- Create test question set
- Evaluate answer quality
- Improve prompts
- Tune retrieval parameters
- Fix edge cases
Acceptance: >90% answer accuracy on test set

================================================================================
RELEASE DEPENDENCIES
================================================================================

Release Dependency Chain:
Release 1 (Phase 1) → Release 2 (Phase 2) → Release 3 (Phase 3) →
Release 4 (Phase 4) → Release 5 (RAG)

Feature Dependencies:
- FEAT-002, 003, 004 depend on FEAT-001 (need captured traffic)
- FEAT-005 depends on FEAT-002 and FEAT-003 (integration requires both working)
- FEAT-006 depends on completion of Release 1
- FEAT-007, 008 depend on FEAT-006 (CI/CD before cloud)
- FEAT-009, 010, 011 can be developed in parallel
- FEAT-012 depends on all documentation being complete

Critical Path:
FEAT-001 → FEAT-002 → FEAT-003 → FEAT-005 → FEAT-006 → FEAT-007

================================================================================
RISK REGISTER
================================================================================

HIGH RISKS:

RISK-001: Hardware Delivery Delay
Impact: High | Probability: Low
Mitigation: Hardware ordered early, alternative suppliers identified
Contingency: Start with software simulation while waiting

RISK-002: TinyML Model Size Exceeds 100KB
Impact: High | Probability: Medium
Mitigation: Aggressive quantization, pruning, architecture optimization
Contingency: Use simpler model, reduce feature set

RISK-003: STM32 Ethernet Driver Issues
Impact: High | Probability: Medium
Mitigation: Use official ST examples, community support forums
Contingency: Use UART communication as fallback

RISK-004: ML Model Accuracy Below Target
Impact: Medium | Probability: Medium
Mitigation: More training data, feature engineering, ensemble methods
Contingency: Lower threshold to 85%, focus on specific attack types

MEDIUM RISKS:

RISK-005: Cloud Service Costs
Impact: Low | Probability: Low
Mitigation: Use free tiers (AWS/Azure), minimize data uploads
Contingency: Use local dashboard only, skip cloud

RISK-006: Time Estimation Errors
Impact: Medium | Probability: High
Mitigation: 20% buffer included in estimates, flexible timeline
Contingency: Descope Phase 4 features if needed

RISK-007: AUTOSAR Complexity
Impact: Low | Probability: Medium
Mitigation: Start simple, focus on architecture demonstration
Contingency: Implement concepts only, not full AUTOSAR compliance

LOW RISKS:

RISK-008: Documentation Overhead
Impact: Low | Probability: Low
Mitigation: Document as you build, templates prepared
Contingency: Minimal documentation for Phase 1, complete later

================================================================================
SUCCESS METRICS
================================================================================

Technical Metrics:
- Detection accuracy: >90% for port scan and DoS, >85% for exfiltration
- False positive rate: <5%
- Inference latency: <100ms (Pi), <10ms (STM32)
- TinyML model size: <100KB
- Code coverage: >80%
- Uptime: 99% (24/7 operation capability)

Project Metrics:
- All 40 requirements verified
- 12 features delivered
- 80+ stories completed
- 450+ hours invested
- 15+ certifications earned

Portfolio Metrics:
- GitHub stars: Target 50+
- Demo video views: Target 500+
- LinkedIn profile views: Track increase
- Interview invitations: Track count

Career Metrics:
- Job offers received: Target 3+
- Salary offered: Target €100k+
- Interview-to-offer ratio: >30%

================================================================================
TIMELINE SUMMARY
================================================================================

Month-by-Month Deliverables:

February 2025:
- Hardware setup complete
- Packet capture working
- Basic traffic analysis
- Coursera: ML Spec (Week 1-4)

March 2025:
- Attack simulation working
- Feature extraction complete
- ML model trained
- Coursera: ML Spec (Week 5-8)

April 2025:
- STM32 TinyML working
- Model conversion complete
- TinyML inference on device
- Coursera: ML Spec (Week 9-12) ✓

May 2025:
- System integration complete
- End-to-end detection working
- Phase 1 COMPLETE ✓
- Coursera: Deep Learning Spec starts

June 2025:
- CI/CD pipeline operational
- Test coverage >80%
- Phase 2 COMPLETE ✓
- Coursera: DL Spec continues

July 2025:
- WiFi connectivity stable
- Cloud alerts working
- Coursera: DL Spec continues

August 2025:
- Dashboard operational
- Email alerts working
- Phase 3 COMPLETE ✓
- Coursera: DL Spec complete ✓

September 2025:
- AUTOSAR architecture implemented
- Coursera: TinyML Spec starts

October 2025:
- Yocto Linux running
- FOTA framework working
- Coursera: TinyML Spec continues

November 2025:
- Security hardening complete
- Phase 4 COMPLETE ✓
- Coursera: TinyML Spec complete ✓

December 2025:
- Final testing and polish
- Complete documentation
- Demo video creation
- Coursera: RAG courses start

January 2026:
- RAG data preparation
- Vector database indexed
- RAG query engine working
- Coursera: RAG courses continue

February 2026:
- RAG web interface complete
- Public deployment
- Phase 5 COMPLETE ✓
- PROJECT COMPLETE! 🎉

================================================================================
APPENDIX: STORY POINT ESTIMATION GUIDE
================================================================================

Story Points = Hours for this project

Estimation Guidelines:
- 1-2 hours: Simple configuration, straightforward implementation
- 3-4 hours: Moderate complexity, some research needed
- 5-8 hours: Complex feature, multiple components
- 10+ hours: Very complex, significant R&D

Velocity Tracking:
- Track actual hours vs. estimated
- Adjust future estimates based on variance
- Typical velocity: 10-12 hours/week on project

Buffer Policy:
- All estimates include 20% buffer for debugging
- Integration tasks have 30% buffer
- New technology (TinyML, AUTOSAR) has 40% buffer

================================================================================
END OF RELEASE PLAN
================================================================================
