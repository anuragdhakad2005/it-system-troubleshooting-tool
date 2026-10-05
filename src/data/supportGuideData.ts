import { SupportGuideTopic } from '../types';

export const SUPPORT_GUIDE_TOPICS: SupportGuideTopic[] = [
  {
    id: 'task-manager',
    title: 'A. Task Manager & Process Management',
    summary: 'Essential operating system utility for monitoring system performance, analyzing CPU/RAM usage, and safely terminating frozen applications.',
    category: 'OS & System Tools',
    practicalTip: 'Always check the "Processes" tab sorted by CPU or Memory before force-closing; give an unresponsive app 30 seconds if it is saving a large file.',
    sections: [
      {
        heading: '1. What is Task Manager?',
        content: 'Task Manager (Activity Monitor on macOS, top/htop/system-monitor on Linux) is a core administrative tool built into modern operating systems. It provides real-time visibility into running processes, system resource utilization (CPU, Memory, Disk, Network, GPU), startup applications, and background system services.'
      },
      {
        heading: '2. How to Open Task Manager',
        content: 'You can launch Task Manager quickly through multiple standard shortcuts:',
        bulletPoints: [
          'Direct Keyboard Shortcut: Press Ctrl + Shift + Esc (instantly opens Task Manager on Windows without intermediate menus)',
          'Security Menu: Press Ctrl + Alt + Delete and select "Task Manager"',
          'Taskbar / Start Menu: Right-click the Windows Start button (or empty taskbar space) and select "Task Manager"',
          'Run Command: Press Win + R, type taskmgr, and press Enter',
          'macOS Equivalent: Press Cmd + Space, type Activity Monitor, and press Enter'
        ]
      },
      {
        heading: '3. Checking CPU & Memory Usage',
        content: 'Navigate to the "Processes" or "Performance" tab to understand which programs are consuming system resources:',
        bulletPoints: [
          'CPU Usage (%): Shows the fraction of processor capacity currently executed. Normal idle baseline is typically 1% to 10%. If CPU stays at 100%, system response will freeze.',
          'Memory Usage (RAM): Displays physical RAM consumption. If RAM exceeds 90%, the OS relies on slower virtual memory paging on the storage drive, resulting in sluggish performance.',
          'Sorting: Click on the "CPU" or "Memory" column header to sort in descending order and identify high-consumption programs immediately.'
        ]
      },
      {
        heading: '4. How to Safely Close an Unresponsive Application',
        content: 'When an application freezes and displays "(Not Responding)" in its title bar:',
        bulletPoints: [
          'Step 1: Locate the frozen application in the Task Manager "Processes" list.',
          'Step 2: Click on the process to highlight it.',
          'Step 3: Click the "End task" button in the upper-right corner (or right-click the process and choose "End task").',
          'Step 4: If the process refuses to close, switch to the "Details" tab, locate the executable (.exe), right-click and choose "End process tree" to terminate child processes.'
        ]
      }
    ]
  },
  {
    id: 'os-installation',
    title: 'B. Operating System Installation Guide',
    summary: 'A structured, high-level procedure for performing a clean, legal operating system installation on modern computer hardware.',
    category: 'Setup & Deployment',
    practicalTip: 'Always verify UEFI boot mode and AHCI storage controller settings in BIOS prior to starting installation.',
    sections: [
      {
        heading: '1. Step 1: Backup Important Data',
        content: 'A clean OS installation reformats the storage partition, which permanently erases existing files. Always back up user files (Documents, Desktop, Photos, Project files, Browser bookmarks) to an external USB hard drive or authorized cloud storage before proceeding.'
      },
      {
        heading: '2. Step 2: Create Official Installation Media',
        content: 'Always download operating systems from official, verified manufacturer repositories to guarantee security, integrity, and stability. Never use untrusted third-party cracked ISOs or pirated software.',
        bulletPoints: [
          'Windows: Use the official Microsoft Media Creation Tool from microsoft.com to create a bootable USB flash drive (minimum 8 GB required).',
          'Linux: Download certified ISO images from the official distribution website (e.g., Ubuntu, Fedora, Debian) and write to USB using verified tools like Rufus or BalenaEtcher.',
          'macOS: Use Apple macOS Recovery (Command + Option + R during startup) to download and install the official signed OS directly from Apple servers.'
        ]
      },
      {
        heading: '3. Step 3: Boot From the Installation Media',
        content: 'Insert the bootable USB flash drive into the target computer, turn on the power, and press the manufacturer boot menu key (commonly F12, F11, F9, or Del/Esc depending on Dell, HP, Lenovo, or custom motherboards). Select the UEFI USB drive from the boot options.'
      },
      {
        heading: '4. Step 4: Select Installation Options & Drive Partitioning',
        content: 'Choose language, time, and keyboard layout. For a fresh install, select "Custom: Install Windows only (advanced)". Select the target SSD/HDD drive. If performing a total refresh, delete existing partitions on the target drive to leave "Unallocated Space", then click "Next" so the installer configures optimal EFI system and recovery partitions automatically.'
      },
      {
        heading: '5. Step 5: Post-Installation Drivers & Security Updates',
        content: 'Once the desktop appears:',
        bulletPoints: [
          'Run Windows Update / system package manager to install critical security patches and chipset drivers.',
          'Install dedicated graphics drivers directly from official hardware vendors (Intel, AMD, NVIDIA).',
          'Verify Device Manager has no missing device drivers (yellow exclamation icons).'
        ]
      }
    ]
  },
  {
    id: 'software-installation',
    title: 'C. Safe Software Installation Practices',
    summary: 'Standard IT protocol for evaluating, downloading, validating permissions, and safely deploying software applications.',
    category: 'Setup & Deployment',
    practicalTip: 'Always choose "Custom / Advanced Installation" in setup wizards to uncheck bundled third-party adware, toolbars, or telemetry opt-ins.',
    sections: [
      {
        heading: '1. Download from Official & Trusted Sources',
        content: 'Only obtain setup files from the software publisher’s official website or approved enterprise app repositories (such as the Microsoft Store, official GitHub releases, or organizational Software Center). Avoid third-party freeware download portals that repackage installers with bloatware.'
      },
      {
        heading: '2. Verify File Integrity & Digital Signatures',
        content: 'Right-click the downloaded installer (.exe / .msi), select "Properties", and inspect the "Digital Signatures" tab. A valid cryptographic certificate issued to the recognized company guarantees the file was not altered or infected in transit.'
      },
      {
        heading: '3. Run the Installer & Choose Install Type',
        content: 'Double-click the installer. When the User Account Control (UAC) prompt appears, verify the publisher name. Prefer standard installation paths (Program Files) and select "For all users" if deploying in a shared lab environment, or "Current user only" if standard permissions are required.'
      },
      {
        heading: '4. Check Required Permissions & Firewall Rules',
        content: 'If the software needs to communicate over the network (e.g. database client, web development server), Windows Firewall will prompt to allow access. Only check "Private networks" for security unless remote access from public networks is specifically mandated.'
      },
      {
        heading: '5. Open & Test the Software',
        content: 'Launch the application, verify basic functionality, ensure license activation is registered if applicable, and configure auto-update preferences to keep security patches current.'
      }
    ]
  },
  {
    id: 'router',
    title: 'D. Network Routers: Function & Role',
    summary: 'Network Layer (OSI Layer 3) device that connects disparate networks, directs internet traffic, and provides essential gateway services.',
    category: 'Networking Infrastructure',
    practicalTip: 'The router IP address listed as "Default Gateway" in your system network properties is the address you type into a browser to access the admin configuration interface.',
    sections: [
      {
        heading: '1. What is a Router?',
        content: 'A router is a specialized networking device that connects two or more different networks together — most commonly your Local Area Network (LAN) inside your home, college lab, or office, and the Wide Area Network (WAN) representing the public Internet.'
      },
      {
        heading: '2. Core Functions of a Router',
        bulletPoints: [
          'Packet Forwarding & Routing: Examines destination IP addresses on incoming data packets and forwards them along the optimal path using routing tables.',
          'Network Address Translation (NAT): Converts multiple private local IP addresses (e.g. 192.168.1.x) into a single public IPv4 address assigned by your Internet Service Provider (ISP), preserving address space and shielding internal devices.',
          'DHCP Server: Automatically assigns dynamic IP addresses, subnet masks, default gateways, and DNS server addresses to client devices when they join.',
          'Built-in Firewall: Inspects incoming stateful traffic to block unauthorized incoming connection attempts from the outside Internet.'
        ]
      },
      {
        heading: '3. Home Router vs Enterprise Router',
        content: 'A home "wireless router" is actually an all-in-one appliance combining three separate devices into a single plastic box: a Router (Layer 3), a Switch (Layer 2 with 4 LAN ports), and a Wireless Access Point (Wi-Fi transmitter). In enterprise college campuses, these three functions are decoupled into dedicated rack-mounted hardware.'
      }
    ]
  },
  {
    id: 'switch',
    title: 'E. Network Switches: Local Network Core',
    summary: 'Data Link Layer (OSI Layer 2) device that connects local client devices together inside a LAN using physical MAC addresses.',
    category: 'Networking Infrastructure',
    practicalTip: 'Modern switches provide full duplex communication on every port, meaning devices can send and receive data at 1 Gbps / 10 Gbps simultaneously without collision.',
    sections: [
      {
        heading: '1. What is a Network Switch?',
        content: 'A network switch is a high-speed multi-port hardware device that operates at Layer 2 (Data Link Layer) of the OSI model. Its primary mission is to connect multiple wired computers, printers, servers, and wireless access points together into a single cohesive Local Area Network (LAN).'
      },
      {
        heading: '2. How a Switch Works (MAC Address Learning)',
        content: 'Unlike an obsolete network hub which blindly repeated every packet to every single port, an intelligent switch learns and maintains a MAC Address Table (Content Addressable Memory / CAM table):',
        bulletPoints: [
          'When PC-A sends data to PC-B, the switch reads the source MAC address and remembers which physical port PC-A is connected to.',
          'The switch inspects the destination MAC address and forwards the frame ONLY out the specific port leading to PC-B.',
          'This eliminates network packet collisions and provides full dedicated bandwidth to each connected device simultaneously.'
        ]
      },
      {
        heading: '3. Difference: Hub vs Switch vs Router',
        bulletPoints: [
          'Hub (Layer 1): Obsolete and dumb. Broadcasts every incoming frame to every single port, causing network congestion and collisions.',
          'Switch (Layer 2): Intelligent local traffic forwarder. Forwards frames directly to target devices using MAC addresses inside the same subnet.',
          'Router (Layer 3): Network-to-network gateway. Uses IP addresses to route packets between different subnets and out to the global Internet.'
        ]
      },
      {
        heading: '4. Managed vs Unmanaged Switches',
        content: 'Unmanaged switches are simple plug-and-play boxes with no configuration interface (ideal for small classrooms). Managed switches (Cisco, Aruba, Juniper) allow network administrators to configure VLANs (Virtual LANs), Quality of Service (QoS), port mirroring for monitoring, and Spanning Tree Protocol (STP) to prevent network loops.'
      }
    ]
  },
  {
    id: 'basic-networking',
    title: 'F. Fundamentals of Networking & Connectivity',
    summary: 'Core foundational concepts every IT support technician must master: IP addressing, Gateways, LAN, Wi-Fi, and DNS.',
    category: 'Networking Infrastructure',
    practicalTip: 'If you can ping an external IP address like 8.8.8.8 but web pages like google.com fail to load, the network is functional but your DNS resolver is failing.',
    sections: [
      {
        heading: '1. IP Address (IPv4 & IPv6)',
        content: 'An Internet Protocol (IP) address is a unique numerical identifier assigned to every device on a network so they can locate and communicate with each other.',
        bulletPoints: [
          'IPv4: 32-bit numerical address expressed as four octets (e.g. 192.168.1.45). Supports ~4.3 billion unique addresses.',
          'IPv6: 128-bit hexadecimal address (e.g. 2001:0db8:85a3::8a2e:0370:7334) created to replace IPv4 due to global address exhaustion.',
          'Public IP: Globally routable address assigned by your ISP, visible to the outside world.',
          'Private IP: Reserved addresses used strictly inside private LANs (RFC 1918 ranges: 192.168.x.x, 10.x.x.x, 172.16.x.x to 172.31.x.x).'
        ]
      },
      {
        heading: '2. Default Gateway',
        content: 'The default gateway is the node (usually the internal interface of your local router) that serves as the access point or "exit door" to other networks. When a computer needs to send a packet to an IP address outside its local subnet, it encapsulates the packet and sends it directly to the default gateway address (e.g. 192.168.1.1).'
      },
      {
        heading: '3. Wi-Fi vs Ethernet LAN',
        bulletPoints: [
          'LAN (Ethernet): Uses physical copper twisted-pair cables (Cat5e, Cat6) with RJ-45 connectors. Delivers ultra-low latency, maximum stability, immunity to radio interference, and speeds up to 10 Gbps.',
          'Wi-Fi (Wireless LAN): Uses radio wave frequencies (2.4 GHz, 5 GHz, and 6 GHz) adhering to IEEE 802.11 standards (Wi-Fi 5 / 802.11ac, Wi-Fi 6 / 802.11ax). Highly convenient for laptops and mobile devices, but subject to interference from walls, microwave ovens, and distance.'
        ]
      },
      {
        heading: '4. Domain Name System (DNS)',
        content: 'DNS is the phonebook of the Internet. Humans remember human-friendly hostnames (such as wikipedia.org), whereas computers communicate using binary IP addresses (like 208.80.154.224). DNS resolvers translate the domain name into an IP address in milliseconds.'
      },
      {
        heading: '5. The End-to-End Web Request Lifecycle',
        content: 'When you type a URL into your browser:',
        bulletPoints: [
          '1. The OS queries DNS to resolve the website name to an IP address.',
          '2. The browser establishes a TCP handshake (and TLS encryption handshake for HTTPS).',
          '3. The computer sends the packet out through the local switch to the default gateway router.',
          '4. The router uses NAT to translate your private IP to public IP and forwards it across the ISP network.',
          '5. The destination web server responds with the requested HTML content.'
        ]
      }
    ]
  }
];
