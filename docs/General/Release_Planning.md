
# NETWORK INTRUSION DETECTION SYSTEM WITH TINYML
## RELEASE PLAN

**Project**: Network IDS with TinyML  
**Author**: Sivaramasubramanian Sundararaj  
**Document Version**: 1.0  

_Last updated: {{ git_revision_date_localized }}_

----

## RELEASE OVERVIEW

**Total Releases**: 5 (4 core phases + 1 RAG enhancement)  
**Timeline**: February 2026 - April 2027 (15 months)  
**Total Features**: 12  
**Total Story Points Estimate**: 450 hours

### Release Schedule:
- [Release 1 (CORE FUNCTIONALITY OF IDS)](#release-1-core-functionality-phase-1)  
    - Feb 2026 - Jun 2026 (4 months)  
- [Release 2 (PROFESSIONAL INFRASTRUCTURE)](#release-2-professional-infrastructure-phase-2)  
    - Jul 2026 - Aug 2026 (2 month)  
- [Release 3 (CLOUD INTEGRATION)](#release-3-cloud-integration-phase-3)  
    - Sep 2026 - Oct 2026 (2 months)  
- [Release 4 (ADVANCED FEATURES)](#release-4-advanced-features-phase-4)  
    - Nov 2026 - Jan 2027 (3 months)  
- [Release 5 (RAG DOCUMENTATION ASSISTANT)](#release-5-rag-documentation-assistant-phase-5)  
    - Feb 2027 - Apr 2027 (3 months)

### RELEASE 1: CORE FUNCTIONALITY (PHASE 1)

**Release Date**: Jun 12, 2026  
**Duration**: 4 months (February - Jun 2026)  
**Effort**: 150 hours  
**Goal**: Portfolio-ready working intrusion detection system

#### Features Included:
- [FEAT-001: Network Traffic Capture (30hrs, 23 Feb 2026 - 13 Mar 2026)](#epic-11-network-traffic-capture-feat-001)
- [FEAT-002: ML-based Intrusion Detection (40hrs, 16 Mar 2026 - 10 Apr 2026)](#epic-12-ml-based-intrusion-detection-feat-002)
- [FEAT-003: TinyML Fuzzing Detection (40hrs, 13 Apr 2026 - 8 May 2026)](#epic-13-tinyml-fuzzing-detection-feat-003)
- [FEAT-004: Attack Simulation (20hrs, 11 May 2026 - 22 May 2026)](#epic-14-attack-simulation-feat-004)
- [FEAT-005: System Integration (20hrs, 25 May 2026 - 5 Jun 2026)](#epic-15-system-integration-feat-005)

#### Success Criteria:
[x] Raspberry Pi captures and analyzes network traffic  
[x] ML model detects 3+ attack types with >90% accuracy  
[x] STM32 detects fuzzing attacks using TinyML  
[x] System demonstrates end-to-end detection capability  
[x] Complete documentation available  
[x] Demo video created  

#### EPIC 1.1: NETWORK TRAFFIC CAPTURE (FEAT-001)

**Epic Owner**: Sivaramasubramanian Sundararaj  
**Priority**: Critical  
**Effort Estimate**: 30 hours  
**Dependencies**: Hardware setup complete  

**User Story**: As a security analyst, I want to capture network traffic in real-time, so that I can analyze it for potential threats.

**Acceptance Criteria**:  
- System captures minimum 100 packets per second  
- All packet metadata extracted correctly  
- PCAP files generated for offline analysis  
- System handles storage limitations gracefully

**Stories (Tasks):**

| Title | Description | Effort | Tasks | Acceptance criteria |
|-------|-------------|--------|-------|---------------------|
| Hardware Setup | Setup Raspberry Pi 4 with required OS and network configuration | 4 hours | - Flash Raspberry Pi OS to SD card <br> - Configure SSH access <br> - Setup static IP addressing <br> - Install system updates <br> - Configure Ethernet interface | Pi boots successfully and accessible via SSH |
| Python Environment Setup | Install and configure Python packages for packet capture | 3 hours | - Install Python 3.9+ <br> - Install Scapy library <br> - Install pandas, numpy <br> - Verify packet capture permissions <br> - Test basic Scapy functionality <br> | All imports successful, test capture works |
| Packet Capture Module | Implement real-time packet capture functionality | 8 hours | - Create PacketCapture class <br> - Implement sniff callback function <br> - Add packet parsing logic <br> - Extract IP, port, protocol, flags <br> - Implement packet buffering <br> - Add error handling <br> | Captures 100+ pps with all fields extracted |
| PCAP File Writer | Save captured packets to PCAP format | 4 hours | - Implement PCAP writer using Scapy <br> - Add file rotation mechanism <br> - Implement file naming convention (timestamp-based) <br> - Add metadata headers <br> | Generated PCAP opens in Wireshark correctly |
| Storage Management | Implement circular buffer for storage management | 6 hours | - Monitor disk space usage <br> - Implement circular buffer mechanism <br> - Delete oldest files when >80% full <br> - Add logging for storage events <br> - Test with limited storage <br> | System runs 24h without storage failure |
| Unit Tests | Create unit tests for capture module | 5 hours | - Test packet parsing accuracy <br> - Test PCAP file generation <br> - Test storage management <br> - Test error handling <br> - Achieve 80% code coverage <br> | All tests pass, coverage >80% | 

#### EPIC 1.2: ML-BASED INTRUSION DETECTION (FEAT-002)

**Epic Owner**: Sivaramasubramanian Sundararaj  
**Priority**: Critical  
**Effort Estimate**: 40 hours  
**Dependencies**: EPIC 1.1 complete

**User Story**: As a network administrator, I want the system to automatically detect
network attacks using machine learning so that I can respond to threats quickly.

**Acceptance Criteria:**  
- Detects port scanning with >90% accuracy  
- Detects DoS attacks with >90% accuracy  
- Detects data exfiltration with >85% accuracy  
- False positive rate <5%  
- Real-time alerts generated within 100ms

**Stories (Tasks):**

| Title | Description | Effort | Tasks | Acceptance criteria |
|-------|-------------|--------|-------|---------------------|
| Feature Engineering Design | Design and document feature extraction strategy | 5 hours | - Research network flow features <br> - Define feature list (packet count, byte count, timing, etc.) <br> - Design time window mechanism <br> - Document feature rationale | Feature specification document complete |
| Feature Extraction Module | Implement feature extraction from packet data | 10 hours | - Create FeatureExtractor class <br> - Implement flow aggregation (5-tuple) <br> - Calculate statistical features (mean, std, entropy) <br> - Implement time windowing (configurable) <br> - Extract protocol-specific features (TCP flags) <br> - Validate feature correctness | All features extracted correctly for test flows |
| Training Data Collection | Collect and label training dataset | 6 hours | - Capture normal traffic (home network) <br> - Generate attack traffic (port scan, DoS, exfiltration) <br> - Label dataset (normal vs attack type) <br> - Split into train/validation/test sets <br> - Save dataset to CSV | Labeled dataset with 1000+ samples per class |
| ML Model Training | Train machine learning models | 8 hours | - Implement Random Forest classifier <br> - Implement Isolation Forest (anomaly detection) <br> - Feature scaling/normalization <br> - Hyperparameter tuning <br> - Cross-validation <br> - Model evaluation (accuracy, precision, recall) | Models achieve >90% accuracy on validation set |
| Real-time Detection Engine | Implement real-time detection using trained models | 8 hours | - Create DetectionEngine class <br> - Load trained models <br> - Implement sliding window processing <br> - Generate alerts on detection <br> - Measure latency (target <100ms) <br> - Add logging | Real-time detection working with <100ms latency |
| Model Persistence | Save and load trained models | 3 hours | - Implement model serialization (joblib) <br> - Version control for models <br> - Load model at startup <br> - Handle model loading errors | Models persist across restarts |

#### EPIC 1.3: TINYML FUZZING DETECTION (FEAT-003)

**Epic Owner**: Sivaramasubramanian Sundararaj  
**Priority**: Critical  
**Effort Estimate**: 40 hours  
**Dependencies**: STM32 hardware available  

**User Story**: As an embedded systems engineer, I want to detect malformed packets
on the STM32 gateway using TinyML so that I can provide edge-level security.

**Acceptance Criteria**:  
- TinyML model <100KB  
- Inference latency <10ms per packet  
- RAM usage <50KB  
- Detection accuracy >85% for fuzzing attacks  

**Stories (Tasks):**

| Title | Description | Effort | Tasks | Acceptance criteria |
|-------|-------------|--------|-------|---------------------|
| STM32 Development Environment | Setup STM32 development tools and test basic functionality | 6 hours | - Install STM32CubeIDE <br> - Install ST-Link drivers <br> - Create new project for NUCLEO-H755ZI <br> - Configure clock settings <br> - Test GPIO (LED blink) <br> - Test UART debug output <br> | LED blinks, debug messages visible | 
| Ethernet Driver Setup | Configure Ethernet peripheral on STM32 | 8 hours | - Configure Ethernet peripheral in CubeMX <br> - Initialize Ethernet MAC and PHY <br> - Implement basic packet reception <br> - Setup static IP (192.168.10.2) <br> - Test ping from Raspberry Pi <br> - Debug Ethernet issues <br> | STM32 responds to ping from Pi |
|TensorFlow Lite Micro Integration | Integrate TFLite Micro into STM32 project | 8 hours | - Download TFLite Micro library <br> - Add to STM32 project <br> - Configure build settings <br> - Test with example model <br> - Verify compilation <br> - Measure memory footprint <br> | Example TFLite model runs on STM32 |
| Fuzzing Detection Model Training | Train lightweight model for fuzzing detection | 6 hours | - Generate fuzzing attack dataset (malformed packets) <br> - Design lightweight model architecture <br> - Train on laptop (Keras) <br> - Quantize to int8 <br> - Convert to TFLite format <br> - Verify model size <100KB <br> | Quantized TFLite model <100KB, accuracy >85% |
| On-Device Inference | Implement inference on STM32 | 8 hours | - Load TFLite model to STM32 flash <br> - Extract features from incoming packets <br> - Run inference using TFLite interpreter <br> - Measure inference latency <br> - Optimize for <10ms latency <br> - Measure RAM usage <br> | Inference <10ms, RAM <50KB |
| Testing and Validation | Test TinyML detection on real traffic | 4 hours | - Send normal packets from Pi <br> - Send fuzzing attacks from Pi <br> - Verify detection accuracy <br> - Test edge cases <br> - Performance benchmarking <br>  | >85% accuracy on test set |

#### EPIC 1.4: ATTACK SIMULATION (FEAT-004)

**Epic Owner**: Sivaramasubramanian Sundararaj  
**Priority**: High  
**Effort Estimate**: 20 hours  
**Dependencies**: Network setup complete  

**User Story**: As a tester, I want to generate various network attacks so that I
can validate the detection capabilities of the system.

**Acceptance Criteria:**  
- Port scan simulation (configurable rate)  
- DoS attack simulation (high packet rate)  
- Fuzzing attack simulation (malformed packets)  
- Data exfiltration simulation  
- All attacks logged with parameters

**Stories (Tasks):**

| Title | Description | Effort | Tasks | Acceptance criteria |
|-------|-------------|--------|-------|---------------------|
| Attack Simulator Framework | Create framework for attack simulation | 4 hours | - Create AttackSimulator class  <br> - Define attack interface <br> - Implement logging mechanism <br> - Add configuration parser <br> | Framework structure complete |
| Port Scan Simulator | Implement port scanning attack generator | 4 hours | - Implement SYN scan (TCP) <br> - Make port range configurable <br> - Make scan rate configurable (1-1000 ports/sec) <br> - Log scan parameters <br> - Verify with Wireshark <br> | Port scan detectable by IDS |
| DoS Attack Simulator | Generate DoS attack traffic | 4 hours | - Implement high-rate packet generation <br> - Target configurable IP/port <br> - Configurable packet rate (up to 1000 pps) <br> - Multiple source IPs (spoofing) <br> - Log attack parameters <br> | DoS attack detectable by IDS | 
| Fuzzing Attack Simulator | Generate malformed packets for fuzzing | 4 hours | - Generate packets with invalid length <br> - Corrupt packet headers <br> - Invalid checksums <br> - Random payload data <br> - Log fuzzing parameters <br> | Fuzzing detectable by STM32 TinyML |
| Data Exfiltration Simulator | Simulate data exfiltration pattern | 4 hours| - Generate sustained upload traffic <br> - Large packet sizes (near MTU) <br> - Configurable target IP <br> - Realistic timing patterns <br> - Log exfiltration parameters <br> | Exfiltration detectable by ML model |

#### EPIC 1.5: SYSTEM INTEGRATION (FEAT-005)

**Epic Owner:** Sivaramasubramanian Sundararaj  
**Priority:** Critical  
**Effort Estimate:** 20 hours  
**Dependencies:** EPIC 1.2, 1.3 complete  

**User Story:** As a system integrator, I want Raspberry Pi and STM32 to communicate
reliably so that alerts can be shared and correlated.

**Acceptance Criteria:**  
- Reliable TCP/IP communication  
- Alert delivery <50ms  
- Automatic reconnection on failure  
- Static IP configuration

**Stories (Tasks):**

| Title | Description | Effort | Tasks | Acceptance criteria |
|-------|-------------|--------|-------|---------------------|
| Communication Protocol Design | Design message format and protocol | 3 hours | - Define message structure (JSON/binary) <br> - Design alert format <br> - Define acknowledgment mechanism <br> - Document protocol specification <br> | Protocol documented and reviewed |
| Raspberry Pi Communication Module | Implement Pi-side communication | 5 hours | - Create TCP client (Pi connects to STM32) <br> - Implement message serialization <br> - Add retry logic <br> - Handle disconnections <br> - Test with mock server <br> | Pi sends/receives messages reliably |
| STM32 Communication Module | Implement STM32-side communication | 6 hours | - Create TCP server on STM32 <br> - Implement message parsing <br> - Handle multiple connections (if needed) <br> - Add error handling <br> - Test with mock client <br> | STM32 receives/sends messages reliably |
| Alert Propagation | Implement alert sharing between devices | 4 hours | - STM32 sends fuzzing alerts to Pi <br> - Pi receives and logs STM32 alerts <br> - Measure alert latency <br> - Correlate alerts (if both detect same attack) <br> | Alert delivery <50ms, no packet loss | 
| Integration Testing | End-to-end system integration testing | 2 hours | - Test full detection flow <br> - Test with simulated attacks <br> - Test reconnection after cable disconnect <br> - Stress test (multiple attacks simultaneously) <br> | All integration tests pass | 

### RELEASE 2: PROFESSIONAL INFRASTRUCTURE (PHASE 2)

**Release Date**: June 30, 2025  
**Duration**: 1 month (June 2025)  
**Effort**: 40 hours  
**Goal**: Production-grade code quality and automation  

**Features Included:**  
- [FEAT-006: Testing Infrastructure](#epic-21-testing-infrastructure-feat-006)

**Success Criteria:**  
[x] CI/CD pipeline operational  
[x] Unit test coverage >80%  
[x] Static analysis passing (score >8.0)  
[x] Automated builds on every commit  
[x] Professional documentation  

#### EPIC 2.1: TESTING INFRASTRUCTURE (FEAT-006)

**Epic Owner**: Sivaramasubramanian Sundararaj  
**Priority**: High  
**Effort Estimate**: 40 hours  
**Dependencies**: Phase 1 complete  

**User Story:** As a developer, I want automated testing and CI/CD so that code quality is maintained and regressions are prevented.

**Acceptance Criteria:**  
- 80%+ code coverage  
- All tests pass on every commit  
- Code quality score >8.0/10  
- Build artifacts generated automatically  

**Stories (Tasks):**

| Title | Description | Effort | Tasks | Acceptance criteria |
|-------|-------------|--------|-------|---------------------|
| Unit Test Framework | Setup unit testing framework | 6 hours | - Install pytest <br> - Create test directory structure <br> - Write tests for capture module <br> - Write tests for feature extraction <br> - Write tests for detection engine <br> - Configure code coverage (pytest-cov) | Test suite runs, coverage report generated |
| Integration Tests | Create integration test suite | 8 hours | - Test end-to-end packet flow <br> - Test Pi-STM32 communication <br> - Test attack detection scenarios <br> - Mock external dependencies <br> - Test error handling paths | Integration tests pass |
| GitHub Actions Workflow | Setup CI/CD pipeline | 8 hours | - Create .github/workflows/ci.yml <br> - Configure Python environment <br> - Run linting (Pylint, Flake8) <br> - Run unit tests <br> - Generate coverage report <br> - Fail build on quality issues | Workflow runs on every push |
| Static Code Analysis | Integrate code quality tools | 4 hours | - Configure Pylint <br> - Configure Flake8 <br> - Set quality thresholds <br> - Fix existing issues <br> - Document coding standards | Code quality score >8.0 |
| STM32 Build Automation | Automate STM32 firmware builds | 6 hours | - Setup arm-gcc toolchain in CI <br> - Create build script <br> - Compile firmware in pipeline <br> - Generate .bin/.hex artifacts <br> - Archive build outputs | Firmware builds automatically |
| Documentation Generation | Auto-generate API documentation | 4 hours | - Setup Sphinx (Python docs) <br> - Add docstrings to all modules <br> - Configure auto-build <br> - Deploy to GitHub Pages | API docs auto-published |
| Test Reporting | Generate test reports | 4 hours | - Create test report template <br> - Document test results <br> - Generate coverage badges <br> - Add to README | Test results visible in README |

### RELEASE 3: CLOUD INTEGRATION (PHASE 3)

**Release Date**: August 31, 2025  
**Duration**: 2 months (July - August 2025)  
**Effort**: 60 hours  
**Goal**: Cloud connectivity and remote monitoring  

**Features Included:**  
- [FEAT-007: Cloud Connectivity](#epic-31-cloud-connectivity-feat-007)  
- [FEAT-008: Dashboard & Monitoring](#epic-32-dashboard-monitoring-feat-008)  

**Success Criteria:**  
[x] WiFi connectivity stable  
[x] Alerts uploaded to cloud  
[x] Real-time dashboard operational  
[x] Email notifications working  
[x] 24/7 uptime capability  

#### EPIC 3.1: CLOUD CONNECTIVITY (FEAT-007)

**Epic Owner**: Sivaramasubramanian Sundararaj  
**Priority**: Medium  
**Effort Estimate**: 30 hours  
**Dependencies**: Phase 2 complete

**User Story:** As a security analyst, I want alerts sent to the cloud so that I
can monitor the system remotely from anywhere.

**Acceptance Criteria:**  
- WiFi connection stable (24h uptime)  
- Alerts uploaded within 5 seconds  
- Local buffering when offline  
- Automatic upload on reconnection  

**Stories (Tasks):**

| Title | Description | Effort | Tasks | Acceptance criteria |
|-------|-------------|--------|-------|---------------------|
| WiFi Configuration | Setup WiFi on Raspberry Pi | 3 hours | - Configure WiFi credentials <br> - Test WiFi connectivity <br> - Implement automatic reconnection <br> - Monitor connection quality | WiFi stable for 24 hours |
| Cloud Service Selection | Choose and setup cloud platform | 4 hours | - Evaluate options (AWS IoT, Azure IoT, ThingSpeak) <br> - Create free tier account <br> - Setup IoT endpoint <br> - Configure authentication <br> - Test connection | Cloud endpoint reachable from Pi |
| Alert Upload Module | Implement cloud data upload | 8 hours | - Create CloudUploader class <br> - Implement HTTP POST to cloud endpoint <br> - Format alert data (JSON) <br> - Add authentication headers <br> - Measure upload latency <br> - Handle upload failures | Alerts uploaded within 5 seconds |
| Offline Buffering | Buffer alerts when cloud unavailable | 6 hours | - Implement local SQLite database <br> - Store alerts when offline <br> - Detect connection restoration <br> - Batch upload buffered alerts <br> - Delete uploaded alerts | No data loss during outages |
| Network Monitoring | Monitor network health | 5 hours | - Track WiFi signal strength <br> - Monitor packet loss <br> - Log connection events <br> - Alert on connection issues | Network health metrics logged |
| Cloud Integration Testing | Test cloud connectivity end-to-end | 4 hours | - Test with various attack types <br> - Test offline buffering (simulate outage) <br> - Stress test (many alerts) <br> - Verify data integrity in cloud | All cloud tests pass |

#### EPIC 3.2: DASHBOARD & MONITORING (FEAT-008)

**Epic Owner**: Sivaramasubramanian Sundararaj  
**Priority**: Medium  
**Effort Estimate**: 30 hours  
**Dependencies**: EPIC 3.1 complete  

**User Story:** As a security analyst, I want a real-time dashboard so that I can
visualize system status and attack trends.

**Acceptance Criteria:**
- Dashboard updates in real-time
- Shows key metrics (alert count, system health)
- Email notifications for critical alerts
- Accessible from any device

**Stories (Tasks):**

| Title | Description | Effort | Tasks | Acceptance criteria |
|-------|-------------|--------|-------|---------------------|
| Dashboard Platform Selection | Choose and setup dashboard tool | 3 hours | - Evaluate options (Grafana, custom web app) <br> - Install Grafana or setup Flask app <br> - Configure data source <br> - Test basic visualization | Dashboard platform ready |
| System Status Panel | Display real-time system status | 6 hours | - Create status panel <br> - Show Pi CPU/memory usage <br> - Show STM32 status <br> - Show network connectivity <br> - Auto-refresh every 5 seconds | Status updates in real-time |
| Alert Visualization | Display alerts and statistics | 8 hours | - Create alert timeline chart <br> - Show attack type distribution (pie chart) <br> - Display alert count by severity <br> - Show detection accuracy metrics <br> - Add time range filter | All charts render correctly |
| Email Notification System | Send email alerts for critical events | 6 hours | - Setup SMTP configuration <br> - Create email templates <br> - Implement alert logic (when to email) <br> - Add rate limiting (avoid spam) <br> - Test email delivery | Emails received within 1 minute |
| Mobile Responsiveness | Make dashboard mobile-friendly | 4 hours | - Responsive CSS design <br> - Test on mobile devices <br> - Optimize for small screens | Dashboard usable on phone |
| Dashboard Deployment | Deploy dashboard for remote access | 3 hours | - Configure firewall rules <br> - Setup HTTPS (Let's Encrypt) <br> - Test remote access <br> - Document access instructions | Dashboard accessible remotely |

### RELEASE 4: ADVANCED FEATURES (PHASE 4)

**Release Date**: November 30, 2025  
**Duration**: 3 months (September - November 2025)  
**Effort**: 100 hours  
**Goal**: Enterprise-grade automotive features  

Features Included:  
- [FEAT-009: AUTOSAR Integration](#epic-41-autosar-integration-feat-009)  
- [FEAT-010: Secure FOTA](#epic-42-secure-fota-feat-010)  
- [FEAT-011: Security Hardening](#epic-43-security-hardening-feat-011)  

Success Criteria:  
[x] AUTOSAR architecture implemented  
[x] Secure firmware updates working  
[x] Root of Trust established  
[x] All security features operational  

#### EPIC 4.1: AUTOSAR INTEGRATION (FEAT-009)

**Epic Owner**: Sivaramasubramanian Sundararaj  
**Priority**: Medium  
**Effort Estimate**: 40 hours  
**Dependencies**: Phase 3 complete  

**User Story:** As an automotive software architect, I want to demonstrate AUTOSAR implementation so that I can showcase automotive software expertise.

**Acceptance Criteria:**  
- Classic AUTOSAR on STM32 (BSW, RTE, ASW layers)  
- Adaptive AUTOSAR concepts on Pi  
- Service-oriented architecture  

**Stories (Tasks):**  

| Title | Description | Effort | Tasks | Acceptance criteria |
|-------|-------------|--------|-------|---------------------|
| Classic AUTOSAR Architecture Design | Design Classic AUTOSAR layering for STM32 | 6 hours | - Define BSW modules (Ethernet driver, diagnostics) <br> - Design RTE interfaces <br> - Define ASW components <br> - Document architecture | Architecture diagram complete | 
| BSW Layer Implementation | Implement Basic Software layer | 12 hours | - Refactor Ethernet driver as BSW module <br> - Implement ECUM (ECU State Manager) <br> - Implement COM module <br> - Add diagnostic services (UDS basic) <br> - Follow AUTOSAR naming conventions | BSW modules functional |
| RTE Configuration | Implement Runtime Environment | 8 hours | - Define RTE interfaces <br> - Generate RTE code (or manual implementation) <br> - Connect BSW to ASW via RTE | RTE connects BSW and ASW | 
| ASW Components | Implement Application Software | 6 hours | - Create SWCs for TinyML inference <br> - Create SWC for alert handling <br> - Implement runnable entities <br> - Follow AUTOSAR patterns | ASW components functional |
| Adaptive AUTOSAR on Pi | Implement Adaptive AUTOSAR concepts | 8 hours | - Implement ara::com communication <br> - Create service interfaces <br> - Implement service discovery <br> - SOME/IP protocol (basic) | Services communicate via ara::com |

#### EPIC 4.2: SECURE FOTA (FEAT-010)

**Epic Owner**: Sivaramasubramanian Sundararaj  
**Priority**: Medium  
**Effort Estimate**: 30 hours  
**Dependencies**: Cloud connectivity working  

**User Story:** As a system maintainer, I want to update firmware remotely so that I can deploy fixes and improvements without physical access.

**Acceptance Criteria:**  
- OTA updates for Pi and STM32  
- Cryptographic signature verification  
- A/B partition scheme for rollback  
- Update success rate >95%  

**Stories (Tasks):**

| Title | Description | Effort | Tasks | Acceptance criteria |
|-------|-------------|--------|-------|---------------------|
| Pi A/B Partitioning | Setup dual-partition boot on Pi | 6 hours | - Create two root partitions <br> - Configure bootloader for A/B <br> - Implement partition switching <br> - Test rollback mechanism | Pi boots from A or B partition |
| Update Package Format | Define update package structure | 3 hours | - Design update manifest (version, hash, signature) <br> - Package firmware binary <br> - Add metadata <br> - Document format | Update package specification complete | 
| Signature Generation & Verification | Implement cryptographic signing | 8 hours | - Generate RSA key pair <br> - Sign update packages <br> - Implement signature verification on Pi <br> - Reject unsigned/tampered packages <br> - Test with invalid signatures | Only valid signed updates accepted |
| Pi Update Manager | Implement OTA update on Pi | 6 hours | - Download update from cloud <br> - Verify signature <br> - Install to inactive partition <br> - Switch boot partition <br> - Reboot and verify | Pi updates successfully | 
| STM32 Bootloader | Implement secure bootloader on STM32 | 10 hours | - Create bootloader in flash sector 0 <br> - Implement UART/Ethernet update protocol <br> - Verify application signature before boot <br> - Jump to application if valid | STM32 only boots signed firmware |
| Remote STM32 Update | Update STM32 from Raspberry Pi | 7 hours | - Pi downloads STM32 firmware <br> - Pi sends firmware to STM32 bootloader <br> - STM32 verifies and flashes <br> - STM32 reboots with new firmware | STM32 updated remotely from Pi |

#### EPIC 4.3: SECURITY HARDENING (FEAT-011)

**Epic Owner**: Sivaramasubramanian Sundararaj  
**Priority**: High  
**Effort Estimate**: 30 hours  
**Dependencies**: Hardware (TPM chip) available  

**User Story:** As a security engineer, I want robust security mechanisms so that the system is protected against attacks and tampering.

**Acceptance Criteria:**  
- Secure boot chain verified  
- Cryptographic keys in HSM  
- Encrypted communication (TLS)  
- Anti-tampering detection  

**Stories (Tasks):**

| Title | Description | Effort | Tasks | Acceptance criteria |
|-------|-------------|--------|-------|---------------------|
| Secure Boot on STM32 | Implement secure boot chain | 8 hours | - Configure secure boot in STM32 <br> - Generate root key <br> - Sign bootloader <br> - Sign application <br> - Test boot verification <br> - Test with invalid signature | STM32 refuses tampered firmware |
| HSM Integration (TPM/ATECC608) | Integrate hardware security module | 10 hours | - Connect ATECC608 via I2C <br> - Initialize TPM <br> - Generate key pair in TPM <br> - Store private key in TPM (never exposed) <br> - Use TPM for signing operations <br> - Test key security | Private keys never readable from software | 
| TLS Encryption | Encrypt Pi-STM32 communication | 8 hours | - Implement TLS 1.3 on Pi (using Python SSL) <br> - Implement TLS on STM32 (mbedTLS) <br> - Exchange certificates <br> - Test encrypted traffic (Wireshark) <br> - Verify decryption fails without keys | All traffic encrypted | 
| Anti-Tampering Detection | Detect physical tampering attempts | 4 hours | - Monitor voltage levels (detect glitching) <br> - Detect debug probe attachment <br> - Wipe keys on tamper detection <br> - Test with simulated tampering | Keys erased on tamper event | 

### RELEASE 5: RAG DOCUMENTATION ASSISTANT (PHASE 5)

**Release Date**: February 28, 2026  
**Duration**: 3 months (December 2025 - February 2026)  
**Effort**: 80 hours  
**Goal**: AI-powered project documentation assistant  

**Features Included:**  
- [FEAT-012: RAG Documentation System](#epic-51-rag-documentation-system-feat-012)

**Success Criteria:**  
[x] RAG system indexes all project artifacts  
[x] Natural language Q&A working  
[x] Response accuracy >90%  
[x] Public demo accessible  
[x] Integrated with project portfolio  

#### EPIC 5.1: RAG DOCUMENTATION SYSTEM (FEAT-012)

**Epic Owner**: Sivaramasubramanian Sundararaj  
**Priority**: Low (Enhancement)  
**Effort Estimate**: 80 hours  
**Dependencies**: Project documentation complete  

**User Story:** As a project visitor, I want to ask questions about the project in natural language so that I can understand the implementation details easily.

**Acceptance Criteria:**  
- Answers questions about code, architecture, requirements  
- Retrieves relevant code snippets  
- References datasheets when needed  
- Deployed as public demo  

**Stories (Tasks):**

| Title | Description | Effort | Tasks | Acceptance criteria |
|-------|-------------|--------|-------|---------------------|
| RAG Architecture Design | Design RAG system architecture | 4 hours | - Research RAG frameworks (LangChain, LlamaIndex) <br> - Choose vector database (ChromaDB, Pinecone) <br> - Define data sources <br> - Design query flow <br> - Document architecture | Architecture design complete | 
| Data Collection & Preparation | Collect and prepare all project artifacts | 8 hours | - Collect all markdown documentation <br> - Extract code comments <br> - Download hardware datasheets (PDFs) <br> - Extract requirements from CSV <br> - Clean and structure data <br> - Create metadata (source, category, date) | All data sources collected and organized | 
| Document Chunking | Split documents into chunks for embedding | 6 hours | - Implement text chunking (500-1000 tokens) <br> - Preserve code block integrity <br> - Handle PDF extraction (PyPDF2) <br> - Maintain document context <br> - Generate chunk metadata | All documents chunked appropriately |
| Vector Database Setup | Setup and configure vector database | 6 hours | - Install ChromaDB (or chosen DB) <br> - Generate embeddings (OpenAI or sentence-transformers) <br> - Index all document chunks <br> - Test similarity search <br> - Optimize retrieval performance | All documents indexed and searchable | 
| RAG Query Engine | Implement query processing and retrieval | 10 hours | - Implement LangChain RAG chain <br> - Configure Claude API integration <br> - Implement semantic search <br> - Retrieve top-k relevant chunks <br> - Format context for LLM <br> - Generate responses | RAG answers questions correctly | 
| Code Retrieval Enhancement | Add code-specific retrieval | 8 hours | - Index code by function/class <br> - Add syntax highlighting in responses <br> - Link to GitHub source <br> - Show line numbers <br> - Handle code-specific queries | Code snippets retrieved with context | 
| Traceability Queries | Enable requirements traceability queries | 6 hours | - Parse requirements.csv into structured format <br> - Implement traceability lookups <br> - Link requirements to code/tests <br> - Show impact analysis | Traceability queries working |
| Web Interface | Create user interface for RAG system | 12 hours | - Build Streamlit web app <br> - Create chat interface <br> - Add conversation history <br> - Show retrieved sources <br> - Display code with syntax highlighting <br> - Make mobile-responsive | Web UI functional and attractive | 
| Deployment | Deploy RAG system publicly | 6 hours | - Deploy to Streamlit Cloud (free tier) <br> - Configure environment variables <br> - Test public access <br> - Optimize load time <br> - Add usage analytics | RAG publicly accessible | 
| RAG Documentation | Document RAG system | 4 hours | - Write RAG architecture doc <br> - Document data sources <br> - Create usage guide <br> - Add to project portfolio <br> - Update CV/LinkedIn | RAG fully documented |
| Integration with Portfolio | Integrate RAG into project showcase | 4 hours | - Add RAG link to project README <br> - Create demo video <br> - Generate QR code for CV <br> - Add to GitHub Pages | RAG linked from all project materials |
| Testing & Refinement | Test and improve RAG responses | 6 hours | - Create test question set <br> - Evaluate answer quality <br> - Improve prompts <br> - Tune retrieval parameters <br> - Fix edge cases | >90% answer accuracy on test set |

## RELEASE DEPENDENCIES

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

## SUCCESS METRICS

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

## TIMELINE SUMMARY

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

### APPENDIX: STORY POINT ESTIMATION GUIDE

Story Points = Hours for this project

#### Estimation Guidelines:
- 1-2 hours: Simple configuration, straightforward implementation  
- 3-4 hours: Moderate complexity, some research needed  
- 5-8 hours: Complex feature, multiple components  
- 10+ hours: Very complex, significant R&D  

#### Velocity Tracking:
- Track actual hours vs. estimated  
- Adjust future estimates based on variance  
- Typical velocity: 10-12 hours/week on project  

#### Buffer Policy:
- All estimates include 20% buffer for debugging
- Integration tasks have 30% buffer
- New technology (TinyML, AUTOSAR) has 40% buffer
