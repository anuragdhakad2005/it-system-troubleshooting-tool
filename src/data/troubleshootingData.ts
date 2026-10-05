import { TroubleshootingTopic } from '../types';

export const TROUBLESHOOTING_TOPICS: TroubleshootingTopic[] = [
  {
    id: 'internet-not-working',
    title: 'Internet Not Working',
    shortDesc: 'Device is connected to local router or switch, but external web pages fail to load.',
    category: 'Network',
    icon: 'Globe',
    possibleCauses: [
      'Local Wi-Fi or Ethernet cable is unplugged or disconnected',
      'Router or gateway modem has lost WAN connection with ISP',
      'DNS server resolution failure or corrupted local DNS cache',
      'Incorrect static IP configuration or DHCP lease expired',
      'Captive portal login required (college or guest campus Wi-Fi)',
      'Enterprise firewall or VPN client blocking external outbound traffic'
    ],
    recommendedChecks: [
      'Verify if other devices (e.g. mobile phone, coworker laptop) on the same network have internet',
      'Check physical Ethernet link lights on the laptop and wall port / switch',
      'Confirm Wi-Fi SSID name matches the authorized organization network',
      'Check if local loopback and default gateway respond via terminal'
    ],
    steps: [
      {
        title: 'Step 1: Check Physical & Wireless Connection',
        description: 'Ensure Wi-Fi toggle is ON or the RJ-45 Ethernet cable clicks securely into the port. If on Wi-Fi, disconnect and reconnect to the network.',
        tip: 'Look for amber/green activity lights on the Ethernet port.'
      },
      {
        title: 'Step 2: Test Local Loopback & Gateway Reachability',
        description: 'Open Command Prompt or Terminal and ping the local loopback adapter (127.0.0.1) to confirm your network stack is functional, then ping your local default gateway.',
        command: 'ping 127.0.0.1 && ping 192.168.1.1',
        commandOs: 'Universal',
        tip: 'If 127.0.0.1 fails, your network interface card (NIC) driver or TCP/IP stack is corrupted.'
      },
      {
        title: 'Step 3: Release & Renew DHCP IP Address Lease',
        description: 'Obtain a fresh IP address and subnet configuration from the local DHCP router server.',
        command: 'ipconfig /release && ipconfig /renew',
        commandOs: 'Windows',
        tip: 'On macOS/Linux, run: sudo dhclient -r && sudo dhclient'
      },
      {
        title: 'Step 4: Flush Corrupted DNS Resolver Cache',
        description: 'Clear outdated or poisoned DNS mappings stored on the operating system.',
        command: 'ipconfig /flushdns',
        commandOs: 'Windows',
        tip: 'On macOS, run: sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder'
      },
      {
        title: 'Step 5: Power Cycle the Local Router / Access Point',
        description: 'If you have physical access to the home/office router or modem, unplug its power cable, wait 30 seconds, and plug it back in to reboot its routing table.',
        tip: 'Never press the reset button on managed enterprise switches or routers; only cycle power if permitted.'
      },
      {
        title: 'Step 6: Temporarily Disable Third-Party Antivirus / Proxy / VPN',
        description: 'Corporate VPN clients or misconfigured local proxy settings (such as 127.0.0.1:8080) can intercept and drop HTTP packets.'
      }
    ],
    whenToContactSupport: [
      'Other colleagues in the lab or office also lost connectivity simultaneously (indicates campus switch or ISP outage)',
      'Your network adapter reports "No Internet, secured" and DHCP assigns an APIPA address starting with 169.254.x.x',
      'The Ethernet wall jack shows no LED activity despite trying known-good patch cables',
      'Access requires authentication via 802.1X enterprise RADIUS server certificate'
    ]
  },
  {
    id: 'computer-running-slow',
    title: 'Computer Running Slow',
    shortDesc: 'System experiences sluggish response times, freezing windows, high CPU, or memory bottlenecks.',
    category: 'System',
    icon: 'Cpu',
    possibleCauses: [
      'High background CPU utilization by rogue or stuck processes',
      'System RAM exhausted, causing heavy disk swap/paging file thrashing',
      'Thermal throttling caused by dust buildup or blocked cooling vents',
      'Excessive startup applications launching automatically on boot',
      'Hard disk drive (HDD) high fragmentation or failing drive sectors',
      'Active background Windows Update or antivirus background scan'
    ],
    recommendedChecks: [
      'Open Task Manager / Activity Monitor to inspect real-time CPU and Memory %',
      'Check system uptime (a PC left on for weeks accumulates memory leaks)',
      'Listen for unusually loud cooling fans indicating thermal stress',
      'Verify remaining storage capacity on the primary system drive (C:)'
    ],
    steps: [
      {
        title: 'Step 1: Inspect Resource Consumption in Task Manager',
        description: 'Press Ctrl + Shift + Esc (Windows) or open Activity Monitor (macOS). Sort processes by CPU and Memory descending to identify the culprit process.',
        command: 'taskmgr',
        commandOs: 'Windows',
        tip: 'If a single browser tab is consuming 90% CPU, terminate that specific tab using the browser task manager (Shift + Esc).'
      },
      {
        title: 'Step 2: Perform a Clean System Restart',
        description: 'Reboot the machine completely. Note: In Windows 10/11, select "Restart" rather than "Shut down", because Fast Startup preserves kernel session memory.',
        tip: 'A clean restart clears RAM buffers and resets hanging background services.'
      },
      {
        title: 'Step 3: Disable Unnecessary Startup Programs',
        description: 'In Task Manager, switch to the "Startup apps" tab. Disable third-party utilities that do not need to run immediately at login (e.g. game launchers, redundant cloud syncers).',
        tip: 'Keep audio, graphics, and enterprise security agents enabled.'
      },
      {
        title: 'Step 4: Check for Operating System & Driver Updates',
        description: 'Ensure system patches and chipset drivers are updated to resolve known vendor memory leaks.',
        command: 'ms-settings:windowsupdate',
        commandOs: 'Windows'
      },
      {
        title: 'Step 5: Run System File Checker (SFC) for Integrity',
        description: 'Scan and repair corrupted Windows system DLLs and driver components using the built-in system file repair tool.',
        command: 'sfc /scannow',
        commandOs: 'Windows',
        tip: 'Run from an Administrator Command Prompt.'
      }
    ],
    whenToContactSupport: [
      'CPU is permanently throttled at base frequency (e.g. 0.79 GHz) indicating power supply or thermal sensor fault',
      'Disk usage stays pegged at 100% even with zero active user applications',
      'System randomly triggers Blue Screen of Death (BSOD) errors with STOP codes like MEMORY_MANAGEMENT or CRITICAL_PROCESS_DIED',
      'Physical fan grinding noise or burning electronics odor'
    ]
  },
  {
    id: 'storage-low-disk-space',
    title: 'Storage / Low Disk Space',
    shortDesc: 'Primary system drive is full, preventing updates, temporary file creation, and normal software operations.',
    category: 'Storage',
    icon: 'HardDrive',
    possibleCauses: [
      'Accumulated Windows update temporary files and previous OS installation rollbacks (Windows.old)',
      'Large browser cache, temp files, and downloaded installers in Downloads folder',
      'Bloated log files created by malfunctioning software or crash dumps',
      'Hidden virtual memory pagefile.sys or hiberfil.sys taking excessive disk space',
      'Multiple heavy virtual machines, Docker images, or game installations'
    ],
    recommendedChecks: [
      'Check free space on drive C: (operating systems require at least 15–20% free space for swap and indexing)',
      'Look at the size of the user Downloads and Desktop folders',
      'Check Recycle Bin / Trash for unemptied deleted files'
    ],
    steps: [
      {
        title: 'Step 1: Empty Recycle Bin & Clean Downloads Folder',
        description: 'Right-click the Recycle Bin and select "Empty Recycle Bin". Review your Downloads folder and delete outdated installer executables (.exe, .msi, .iso).',
        tip: 'Sort Downloads by file size descending to quickly pinpoint huge multi-gigabyte files.'
      },
      {
        title: 'Step 2: Run Built-in Disk Cleanup Utility',
        description: 'Launch Windows Disk Cleanup, click "Clean up system files", and check Temporary Windows installation files, Delivery Optimization Files, and Thumbnails.',
        command: 'cleanmgr',
        commandOs: 'Windows',
        tip: 'Cleaning previous Windows installations can instantly recover 15–30 GB of storage.'
      },
      {
        title: 'Step 3: Clear System Temp Folder Manually',
        description: 'Open the Run dialog (Win + R), type %temp%, and delete temporary working files that applications forgot to purge.',
        command: 'del /q/f/s %TEMP%\\*',
        commandOs: 'Windows',
        tip: 'Skip any files currently in use by active programs.'
      },
      {
        title: 'Step 4: Enable Storage Sense Automation',
        description: 'Navigate to Windows Settings > System > Storage and toggle Storage Sense to automatically discard temporary system and app files on a schedule.'
      },
      {
        title: 'Step 5: Identify Space Hogs using TreeSize or WinDirStat',
        description: 'Use an authorized disk visualization tool to locate unexpected folders filled with runaway log files or forgotten virtual disk files.'
      }
    ],
    whenToContactSupport: [
      'Storage is partitioned incorrectly (e.g. C: drive is 60 GB while an empty D: drive has 900 GB available) requiring partition resizing',
      'Disk has hardware read/write bad sector warnings in Event Viewer',
      'Organizational BitLocker encryption or group policy prevents deleting protected system logs',
      'Department requires physical SSD upgrade or network share allocation'
    ]
  },
  {
    id: 'software-not-opening',
    title: 'Software Not Opening',
    shortDesc: 'Application crashes immediately upon launch, hangs silently in background, or throws DLL errors.',
    category: 'Software',
    icon: 'AlertCircle',
    possibleCauses: [
      'A previous instance of the application is frozen in background processes',
      'Missing or corrupt runtime dependencies (.NET Framework, Visual C++ Redistributable)',
      'Corrupted configuration file or user profile cache',
      'Insufficient user access permissions (Run as Administrator required)',
      'Antivirus quarantine false positive blocking the executable',
      'Compatibility conflict following a recent operating system patch'
    ],
    recommendedChecks: [
      'Check Task Manager Details tab to see if the process is already running invisibly',
      'Look for specific error message dialogue boxes or error codes (e.g., 0xc000007b, VCRUNTIME140.dll missing)',
      'Verify if other users on the same computer can launch the software'
    ],
    steps: [
      {
        title: 'Step 1: Kill Ghost Background Process in Task Manager',
        description: 'If an app crashed previously, its process may remain locked in memory. Open Task Manager, locate the program under "Background processes", and click "End task".',
        command: 'taskkill /F /IM program_name.exe',
        commandOs: 'Windows',
        tip: 'Replace program_name.exe with the actual executable name.'
      },
      {
        title: 'Step 2: Try "Run as Administrator"',
        description: 'Right-click the application desktop shortcut and choose "Run as administrator". Some legacy tools require elevated rights to write to Program Files or registry keys.'
      },
      {
        title: 'Step 3: Install Required Visual C++ Redistributables',
        description: 'Many desktop applications require Microsoft Visual C++ 2015-2022 Redistributable (x64 / x86). If missing, download directly from the official Microsoft support portal.'
      },
      {
        title: 'Step 4: Repair or Reinstall the Application',
        description: 'Go to Settings > Apps > Installed apps. Select the problematic software and choose "Modify" or "Repair" if supported, or perform a clean reinstall.',
        command: 'appwiz.cpl',
        commandOs: 'Windows',
        tip: 'appwiz.cpl opens the classic Programs and Features control panel.'
      },
      {
        title: 'Step 5: Check Windows Event Viewer for Application Crash Logs',
        description: 'Open Event Viewer > Windows Logs > Application. Look for "Error" events with the application name to find the exact faulting module name and exception code.',
        command: 'eventvwr.msc',
        commandOs: 'Windows'
      }
    ],
    whenToContactSupport: [
      'Software prompts for enterprise volume license server or invalid product key',
      'Event Viewer reports hardware memory fault or corrupted cryptographic catalog',
      'The software is an internal proprietary university/corporate package requiring special server database credentials',
      'Group Policy or AppLocker explicitly blocks execution with "Contact your system administrator"'
    ]
  },
  {
    id: 'wifi-problem',
    title: 'Wi-Fi Problem',
    shortDesc: 'Wi-Fi adapter cannot find networks, disconnects constantly, or shows limited connectivity.',
    category: 'Network',
    icon: 'Wifi',
    possibleCauses: [
      'Physical Wi-Fi hardware switch or Airplane Mode keyboard shortcut engaged',
      'Corrupted or outdated wireless network adapter drivers',
      'Wi-Fi frequency band mismatch (2.4 GHz vs 5 GHz channel congestion)',
      'Power management setting putting Wi-Fi card to sleep',
      'Incorrect saved Wi-Fi security profile or password mismatch',
      'Weak signal strength or physical interference from metal structures'
    ],
    recommendedChecks: [
      'Check if Airplane Mode is enabled in Windows Action Center',
      'Check if nearby Wi-Fi network names (SSIDs) appear in the list',
      'Move closer to the wireless access point to test signal strength',
      'Verify if other laptops can connect to the same Wi-Fi SSID'
    ],
    steps: [
      {
        title: 'Step 1: Toggle Airplane Mode & Reconnect Wi-Fi',
        description: 'Turn Airplane Mode ON for 10 seconds, then turn it OFF. Click on your target Wi-Fi network and select "Connect".'
      },
      {
        title: 'Step 2: "Forget" the Wi-Fi Network and Re-enter Credentials',
        description: 'Go to Settings > Network & internet > Wi-Fi > Manage known networks. Select your network, click "Forget", and reconnect by typing the Wi-Fi password freshly.',
        tip: 'This removes stale security certificates and cached authentication tokens.'
      },
      {
        title: 'Step 3: Disable Wi-Fi Power Saving Sleep Mode',
        description: 'In Device Manager, locate Network adapters > Wireless adapter > Properties > Power Management. Uncheck "Allow the computer to turn off this device to save power".',
        command: 'devmgmt.msc',
        commandOs: 'Windows',
        tip: 'This prevents the Wi-Fi card from dropping connection during idle or low battery.'
      },
      {
        title: 'Step 4: Inspect Wireless Interface & Signal Strength via CMD',
        description: 'Inspect current signal percentage, radio type (802.11ax/ac/n), and channel via the native command line.',
        command: 'netsh wlan show interfaces',
        commandOs: 'Windows',
        tip: 'Signal strength below 60% will frequently cause packet loss and drops.'
      },
      {
        title: 'Step 5: Reset the TCP/IP & Winsock Stack',
        description: 'Reset the network catalog and socket routing back to default clean configuration, then restart the PC.',
        command: 'netsh winsock reset && netsh int ip reset',
        commandOs: 'Windows'
      }
    ],
    whenToContactSupport: [
      'Device Manager shows a yellow exclamation mark ⚠ on the Intel/Realtek Wireless card with Code 10 or Code 43',
      'Campus enterprise Wi-Fi (eduroam / WPA2-Enterprise) requires installing a trusted root CA certificate',
      'Access point requires MAC address filtering whitelist for lab devices'
    ]
  },
  {
    id: 'basic-network-problem',
    title: 'Basic Network Problem',
    shortDesc: 'Cannot communicate with local network printers, file shares, or subnet devices.',
    category: 'Network',
    icon: 'Network',
    possibleCauses: [
      'Network profile set to "Public" instead of "Private" (blocks local discovery)',
      'Subnet mask mismatch or conflicting duplicate static IP address on network',
      'Windows Defender Firewall blocking File and Printer Sharing (SMB port 445)',
      'Network Discovery and File Sharing services turned off',
      'Faulty switch port or bad RJ45 Ethernet patch cord'
    ],
    recommendedChecks: [
      'Check current assigned IP address, subnet mask, and default gateway using ipconfig /all',
      'Verify if your device and the printer/server share the same subnet (e.g. 192.168.1.x)',
      'Check if Windows network profile is set to Private'
    ],
    steps: [
      {
        title: 'Step 1: Check Detailed IP Configuration',
        description: 'Examine your IP address, subnet mask, default gateway, and DNS servers.',
        command: 'ipconfig /all',
        commandOs: 'Windows',
        tip: 'On Linux/macOS, use: ifconfig or ip a'
      },
      {
        title: 'Step 2: Change Network Profile to "Private Network"',
        description: 'Open Settings > Network & internet > Properties. Switch Network profile type from Public (recommended for coffee shops) to Private (enables local file/printer sharing).'
      },
      {
        title: 'Step 3: Enable Network Discovery in Control Panel',
        description: 'Open Advanced Sharing Settings. Turn on "Network discovery" and "File and printer sharing" for Private networks.',
        command: 'control.exe /name Microsoft.NetworkAndSharingCenter',
        commandOs: 'Windows'
      },
      {
        title: 'Step 4: Ping the Destination Local Device IP',
        description: 'Test ICMP echo communication to the specific printer or network share IP address.',
        command: 'ping 192.168.1.50',
        commandOs: 'Universal',
        tip: 'Replace 192.168.1.50 with the actual printer or NAS IP address.'
      },
      {
        title: 'Step 5: Trace the Route to Identify Network Hops',
        description: 'Trace packet hops across intermediate routers to see where the connection drops.',
        command: 'tracert 8.8.8.8',
        commandOs: 'Windows',
        tip: 'On macOS/Linux use: traceroute 8.8.8.8'
      }
    ],
    whenToContactSupport: [
      'Static IP assignment is mandated by network policy to access departmental VLANs',
      '802.1Q VLAN isolation prevents your subnet from communicating with the server VLAN',
      'Network switch port requires re-patching in the server rack patch panel'
    ]
  }
];
