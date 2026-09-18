import { SubjectCurriculum } from './types';

export const computerNetworksCurriculum: SubjectCurriculum = {
  key: 'computer-networks',
  label: 'Computer Networks',
  roadmapTitle: 'Computer Networks & Security Track',
  roadmapDescription: 'Master OSI/TCP-IP networking models, IP addressing, subnetting, TCP/UDP transport mechanisms, HTTP/S web communications, DNS, and routing.',
  roadmapSteps: [
    { id: 'cn-1', topicKey: 'networking-foundations', title: 'Networking Fundamentals', description: 'Network topologies, packet switching, bandwidth, latency, and throughput.', order: 1, estimatedMinutes: 45 },
    { id: 'cn-2', topicKey: 'osi-tcpip-models', title: 'OSI & TCP/IP Models', description: '7-layer OSI stack vs 4-layer TCP/IP suite encapsulation and headers.', order: 2, estimatedMinutes: 45 },
    { id: 'cn-3', topicKey: 'ip-addressing-subnets', title: 'IP Addressing & Subnetting', description: 'IPv4/IPv6 addresses, CIDR notation, subnet masks, and network boundaries.', order: 3, estimatedMinutes: 45 },
    { id: 'cn-4', topicKey: 'tcp-vs-udp', title: 'TCP vs UDP', description: 'Connection-oriented 3-way handshake vs connectionless UDP datagrams.', order: 4, estimatedMinutes: 45 },
    { id: 'cn-5', topicKey: 'http-https', title: 'HTTP & HTTPS', description: 'HTTP verbs, headers, status codes, keep-alive, TLS handshakes, and certificates.', order: 5, estimatedMinutes: 60 },
    { id: 'cn-6', topicKey: 'dns-resolution', title: 'DNS Resolution', description: 'Domain name resolution hierarchy, recursive vs iterative lookups, and DNS records.', order: 6, estimatedMinutes: 60 },
    { id: 'cn-7', topicKey: 'routing-protocols', title: 'Routing & Packet Forwarding', description: 'Router lookup tables, BGP, OSPF, NAT translation, and ICMP ping.', order: 7, estimatedMinutes: 60 },
    { id: 'cn-8', topicKey: 'network-security', title: 'Network Security Fundamentals', description: 'Firewalls, VPN tunnels, SYN flood protection, DDoS, and TLS encryption.', order: 8, estimatedMinutes: 60 },
  ],
  learningInsight: {
    overview: "Your current path is building network architecture, protocol mechanics, and data transport security skills.",
    nextStep: "Complete today's Computer Networks mission to master packet encapsulation, TCP handshakes, and DNS."
  },
  diagnosticQuestions: [
    {
      id: 'cn_dq1',
      subjectKey: 'computer-networks',
      conceptKey: 'osi-tcpip-models',
      concept: 'OSI Model Layers',
      difficulty: 'BEGINNER',
      question: 'At which layer of the OSI model do IP addresses and routers operate?',
      options: [
        { id: 'A', text: 'Network Layer (Layer 3)' },
        { id: 'B', text: 'Transport Layer (Layer 4)' },
        { id: 'C', text: 'Data Link Layer (Layer 2)' },
        { id: 'D', text: 'Application Layer (Layer 7)' }
      ],
      correctAnswer: 'A',
      explanation: 'Layer 3 (Network Layer) manages logical IP addressing and inter-network routing.'
    },
    {
      id: 'cn_dq2',
      subjectKey: 'computer-networks',
      conceptKey: 'tcp-vs-udp',
      concept: 'TCP Handshake',
      difficulty: 'BEGINNER',
      question: 'Which sequence of flags establishes a reliable connection in the TCP 3-way handshake?',
      options: [
        { id: 'A', text: 'SYN -> SYN-ACK -> ACK' },
        { id: 'B', text: 'ACK -> SYN -> FIN' },
        { id: 'C', text: 'SYN -> ACK -> FIN' },
        { id: 'D', text: 'CONNECT -> ACCEPT -> READY' }
      ],
      correctAnswer: 'A',
      explanation: 'TCP connection setup follows SYN (client) -> SYN-ACK (server) -> ACK (client).'
    },
    {
      id: 'cn_dq3',
      subjectKey: 'computer-networks',
      conceptKey: 'ip-addressing-subnets',
      concept: 'Subnet Masking',
      difficulty: 'INTERMEDIATE',
      question: 'How many usable host IP addresses are available in a `/24` IPv4 subnet mask (`255.255.255.0`)?',
      options: [
        { id: 'A', text: '254 usable addresses' },
        { id: 'B', text: '256 usable addresses' },
        { id: 'C', text: '512 usable addresses' },
        { id: 'D', text: '128 usable addresses' }
      ],
      correctAnswer: 'A',
      explanation: '2^8 = 256 total addresses minus Network address (0) and Broadcast address (255) leaves 254 usable host IPs.'
    },
    {
      id: 'cn_dq4',
      subjectKey: 'computer-networks',
      conceptKey: 'tcp-vs-udp',
      concept: 'UDP vs TCP Trade-offs',
      difficulty: 'INTERMEDIATE',
      question: 'Why is UDP preferred over TCP for real-time video streaming or online multiplayer gaming?',
      options: [
        { id: 'A', text: 'UDP has low latency due to zero connection setup or retransmission delay overhead' },
        { id: 'B', text: 'UDP guarantees 100% packet delivery' },
        { id: 'C', text: 'UDP encrypts all traffic automatically' },
        { id: 'D', text: 'UDP bypasses router bandwidth caps' }
      ],
      correctAnswer: 'A',
      explanation: 'UDP sacrifices retransmission guarantees to deliver minimal latency for real-time streaming.'
    },
    {
      id: 'cn_dq5',
      subjectKey: 'computer-networks',
      conceptKey: 'dns-resolution',
      concept: 'DNS Record Types',
      difficulty: 'INTERMEDIATE',
      question: 'Which DNS record type maps a domain name directly to an IPv4 address?',
      options: [
        { id: 'A', text: 'A Record' },
        { id: 'B', text: 'AAAA Record' },
        { id: 'C', text: 'CNAME Record' },
        { id: 'D', text: 'MX Record' }
      ],
      correctAnswer: 'A',
      explanation: 'An \'A\' record maps hostnames to IPv4 addresses; \'AAAA\' maps hostnames to IPv6 addresses.'
    },
    {
      id: 'cn_dq6',
      subjectKey: 'computer-networks',
      conceptKey: 'http-https',
      concept: 'HTTP Keep-Alive',
      difficulty: 'INTERMEDIATE',
      question: 'What is the purpose of HTTP Persistent Connections (`Connection: keep-alive`)?',
      options: [
        { id: 'A', text: 'Reuses a single underlying TCP connection for multiple HTTP requests/responses' },
        { id: 'B', text: 'Keeps browser tabs open permanently' },
        { id: 'C', text: 'Disables server timeouts' },
        { id: 'D', text: 'Deletes browser cookies' }
      ],
      correctAnswer: 'A',
      explanation: 'Keep-alive eliminates repeating TCP 3-way handshakes for consecutive resource requests.'
    },
    {
      id: 'cn_dq7',
      subjectKey: 'computer-networks',
      conceptKey: 'routing-protocols',
      concept: 'Network Address Translation',
      difficulty: 'ADVANCED',
      question: 'What is the function of Network Address Translation (NAT) in home/office routers?',
      options: [
        { id: 'A', text: 'Maps multiple private IP addresses inside a local network to a single public IP address' },
        { id: 'B', text: 'Translates domain names to URLs' },
        { id: 'C', text: 'Renders HTML web pages' },
        { id: 'D', text: 'Compresses PDF documents' }
      ],
      correctAnswer: 'A',
      explanation: 'NAT maps local private subnet IPs (e.g. 192.168.x.x) to a public WAN IP, conserving IPv4 addresses.'
    },
    {
      id: 'cn_dq8',
      subjectKey: 'computer-networks',
      conceptKey: 'network-security',
      concept: 'SYN Flood Attacks',
      difficulty: 'ADVANCED',
      question: 'How do SYN Cookies protect servers against TCP SYN Flood Denial of Service attacks?',
      options: [
        { id: 'A', text: 'Encodes initial sequence numbers into ACK responses, avoiding allocating half-open connection state memory until client ACKs' },
        { id: 'B', text: 'Blocks all incoming IP connections' },
        { id: 'C', text: 'Deletes client cookies' },
        { id: 'D', text: 'Enforces password updates' }
      ],
      correctAnswer: 'A',
      explanation: 'SYN Cookies prevent memory table exhaustion from fake SYN floods by encoding state in sequence numbers.'
    }
  ],
  missions: [
    {
      id: 'cn-m1',
      topicKey: 'networking-foundations',
      title: 'Networking Fundamentals — How Computers Communicate',
      description: 'Understand packet switching, bandwidth, latency, and network topologies.',
      estimatedMinutes: 45,
      lesson: {
        title: 'Packet Switching and Network Metrics',
        content: 'Data travels over packet-switched networks in discrete chunks. Latency measures transmission delay; Bandwidth measures data capacity.',
        interactiveExample: {
          language: 'bash',
          code: 'ping -c 4 google.com && traceroute google.com',
          explanation: 'ping measures Round-Trip Time (RTT) latency; traceroute lists router hops.'
        }
      },
      practice: {
        question: 'What network metric measures the time taken for a data packet to travel to a destination and back?',
        options: [
          { id: 'A', text: 'Round-Trip Time (RTT) Latency' },
          { id: 'B', text: 'Bandwidth' },
          { id: 'C', text: 'Throughput' },
          { id: 'D', text: 'Jitter' }
        ],
        correctAnswerId: 'A',
        explanation: 'RTT measures total round-trip propagation and processing delay.'
      },
      review: {
        title: 'Networking Fundamentals Review',
        pitfalls: ['Confusing theoretical link Bandwidth with actual achieved Throughput'],
        edgeCases: ['High packet loss causing TCP congestion window collapsing'],
        keyTakeaway: 'Differentiate between propagation delay (distance/speed of light) and queuing delay.'
      },
      interview: {
        title: 'Technical Viva: What Happens When You Type a URL?',
        question: 'Explain the high-level steps when entering `https://example.com` into a browser address bar.',
        hint: 'DNS lookup, TCP 3-way handshake, TLS handshake, HTTP GET request, rendering.',
        keyPoints: ['DNS resolves IP address', 'TCP connection established (port 443)', 'TLS handshake negotiates encryption', 'HTTP GET request sent and HTML rendered']
      }
    },
    {
      id: 'cn-m2',
      topicKey: 'osi-tcpip-models',
      title: 'OSI & TCP/IP — Understanding Network Layers',
      description: 'Master the 7-layer OSI model and 4-layer TCP/IP protocol stack.',
      estimatedMinutes: 45,
      lesson: {
        title: 'Protocol Layer Encapsulation',
        content: 'Data encapsulates as it descends layers: Data (Application) -> Segment (Transport) -> Packet (Network) -> Frame (Data Link).',
        interactiveExample: {
          language: 'text',
          code: '[Eth Header [IP Header [TCP Header [HTTP Payload]]]]',
          explanation: 'Each layer prepends its specific protocol header.'
        }
      },
      practice: {
        question: 'Which OSI layer handles MAC physical hardware addressing?',
        options: [
          { id: 'A', text: 'Data Link Layer (Layer 2)' },
          { id: 'B', text: 'Network Layer (Layer 3)' },
          { id: 'C', text: 'Transport Layer (Layer 4)' },
          { id: 'D', text: 'Session Layer (Layer 5)' }
        ],
        correctAnswerId: 'A',
        explanation: 'Layer 2 (Data Link) handles local node-to-node frame delivery via MAC addresses.'
      },
      review: {
        title: 'OSI Model Review',
        pitfalls: ['Confusing Layer 2 MAC frame switches with Layer 3 IP packet routers'],
        edgeCases: ['MTU size limits causing IP packet fragmentation'],
        keyTakeaway: 'Layer 2 routes within local subnets; Layer 3 routes across disparate networks.'
      },
      interview: {
        title: 'Technical Viva: OSI vs TCP/IP',
        question: 'Compare the 7-layer OSI conceptual model with the practical 4-layer TCP/IP suite.',
        hint: 'Theoretical reference standard vs actual internet implementation.',
        keyPoints: ['OSI separates Session, Presentation, Application', 'TCP/IP combines top 3 into Application Layer']
      }
    },
    {
      id: 'cn-m3',
      topicKey: 'ip-addressing-subnets',
      title: 'IP Addressing — IPv4 & Subnets',
      description: 'Master IPv4/v6 addressing, CIDR notation, and subnet masks.',
      estimatedMinutes: 45,
      lesson: {
        title: 'CIDR Notation and Subnet Calculations',
        content: 'CIDR notation (`192.168.1.0/24`) defines network bits (24) and host bits (8). Subnet masks split IP ranges.',
        interactiveExample: {
          language: 'bash',
          code: 'ipcalc 10.0.0.0/22',
          explanation: '/22 subnet yields 1022 usable host IP addresses.'
        }
      },
      practice: {
        question: 'How many usable host IP addresses exist in a `/24` subnet?',
        options: [
          { id: 'A', text: '254' },
          { id: 'B', text: '256' },
          { id: 'C', text: '512' },
          { id: 'D', text: '128' }
        ],
        correctAnswerId: 'A',
        explanation: '256 total addresses minus Network (0) and Broadcast (255) yields 254 host IPs.'
      },
      review: {
        title: 'IP Addressing Review',
        pitfalls: ['Assigning reserved Network or Broadcast addresses to host network interfaces'],
        edgeCases: ['Exhaustion of private RFC 1918 IP ranges in massive enterprise networks'],
        keyTakeaway: 'Always reserve first address for Network and last for Broadcast.'
      },
      interview: {
        title: 'Technical Viva: IPv4 vs IPv6',
        question: 'Why is the industry transitioning from IPv4 to IPv6?',
        hint: 'Address space exhaustion (32-bit vs 128-bit).',
        keyPoints: ['IPv4 provides ~4.3 billion addresses (32-bit)', 'IPv6 provides 3.4 x 10^38 addresses (128-bit), eliminating NAT requirements']
      }
    },
    {
      id: 'cn-m4',
      topicKey: 'tcp-vs-udp',
      title: 'TCP vs UDP — Reliable vs Fast Communication',
      description: 'Master TCP handshake, flow control, windowing, and UDP datagrams.',
      estimatedMinutes: 45,
      lesson: {
        title: 'TCP Flow & Congestion Control',
        content: 'TCP ensures reliable byte streams using sequence numbers, ACKs, flow control (sliding window), and congestion control.',
        interactiveExample: {
          language: 'text',
          code: 'Client -> SYN (seq=x) -> Server\nClient <- SYN-ACK (seq=y, ack=x+1) <- Server\nClient -> ACK (ack=y+1) -> Server',
          explanation: '3-way handshake synchronizes sequence numbers.'
        }
      },
      practice: {
        question: 'What TCP flag sequence establishes a connection?',
        options: [
          { id: 'A', text: 'SYN -> SYN-ACK -> ACK' },
          { id: 'B', text: 'ACK -> SYN -> FIN' },
          { id: 'C', text: 'SYN -> ACK -> FIN' },
          { id: 'D', text: 'RST -> SYN -> ACK' }
        ],
        correctAnswerId: 'A',
        explanation: 'SYN -> SYN-ACK -> ACK builds reliable TCP sessions.'
      },
      review: {
        title: 'TCP vs UDP Review',
        pitfalls: ['Assuming UDP guarantees packet delivery order or prevents packet loss'],
        edgeCases: ['Head-of-Line (HoL) blocking in TCP when single lost packet stalls pipeline'],
        keyTakeaway: 'Use TCP for data integrity; use UDP for real-time low-latency streams.'
      },
      interview: {
        title: 'Technical Viva: TCP Flow Control vs Congestion Control',
        question: 'What is the difference between TCP Flow Control and Congestion Control?',
        hint: 'Receiver capacity protection vs network path congestion prevention.',
        keyPoints: ['Flow Control protects receiver buffer from overflow (Advertised Window)', 'Congestion Control protects network routers from saturation (Congestion Window)']
      }
    },
    {
      id: 'cn-m5',
      topicKey: 'http-https',
      title: 'HTTP & HTTPS — Web Communication',
      description: 'Master HTTP methods, headers, status codes, and TLS encryption.',
      estimatedMinutes: 60,
      lesson: {
        title: 'HTTP Protocol & TLS Security',
        content: 'HTTP is stateless text protocol. HTTPS wraps HTTP in TLS encryption, authenticating servers via X.509 certificates.',
        interactiveExample: {
          language: 'bash',
          code: 'curl -I https://cevora.com',
          explanation: 'Inspects HTTP response status code and headers.'
        }
      },
      practice: {
        question: 'Which HTTP status code range indicates a client-side error (e.g. 404 Not Found)?',
        options: [
          { id: 'A', text: '4xx' },
          { id: 'B', text: '2xx' },
          { id: 'C', text: '3xx' },
          { id: 'D', text: '5xx' }
        ],
        correctAnswerId: 'A',
        explanation: '4xx status codes indicate client-side request errors.'
      },
      review: {
        title: 'HTTP/S Review',
        pitfalls: ['Expired TLS certificates causing browser security warning blocks'],
        edgeCases: ['HTTP/2 multiplexing streams over single TCP connection vs HTTP/1.1'],
        keyTakeaway: 'Always enforce HTTPS redirects and HSTS security headers.'
      },
      interview: {
        title: 'Technical Viva: HTTP/1.1 vs HTTP/2 vs HTTP/3',
        question: 'How do HTTP/1.1, HTTP/2, and HTTP/3 differ fundamentally?',
        hint: 'Multiplexing and transport protocols (TCP vs QUIC/UDP).',
        keyPoints: ['HTTP/1.1: Sequential requests per TCP connection', 'HTTP/2: Multiplexed streams over 1 TCP connection', 'HTTP/3: Uses QUIC (UDP) to eliminate TCP Head-of-Line blocking']
      }
    },
    {
      id: 'cn-m6',
      topicKey: 'dns-resolution',
      title: 'DNS — Resolving Domain Names',
      description: 'Master DNS name resolution hierarchy, caching, and record types.',
      estimatedMinutes: 60,
      lesson: {
        title: 'DNS Hierarchy & Resolution',
        content: 'DNS queries resolve human domain names to IP addresses via Root, TLD (.com), and Authoritative Name Servers.',
        interactiveExample: {
          language: 'bash',
          code: 'nslookup -type=MX cevora.com',
          explanation: 'Queries mail exchange (MX) DNS records.'
        }
      },
      practice: {
        question: 'Which DNS record maps a domain name alias to another canonical domain name?',
        options: [
          { id: 'A', text: 'CNAME Record' },
          { id: 'B', text: 'A Record' },
          { id: 'C', text: 'TXT Record' },
          { id: 'D', text: 'PTR Record' }
        ],
        correctAnswerId: 'A',
        explanation: 'CNAME (Canonical Name) aliases one domain name to another.'
      },
      review: {
        title: 'DNS Review',
        pitfalls: ['High TTL (Time-to-Live) values delaying rapid IP failover changes'],
        edgeCases: ['DNS cache poisoning attacks solved by DNSSEC extensions'],
        keyTakeaway: 'Lower TTLs prior to planned server IP migrations.'
      },
      interview: {
        title: 'Technical Viva: Recursive vs Iterative DNS Query',
        question: 'What is the difference between a Recursive and an Iterative DNS query?',
        hint: 'DNS resolver performing full resolution vs returning referral pointers.',
        keyPoints: ['Recursive query asks resolver to return final IP answer', 'Iterative query returns best referral answer pointing to next DNS server']
      }
    },
    {
      id: 'cn-m7',
      topicKey: 'routing-protocols',
      title: 'Routing — Moving Packets Across Networks',
      description: 'Master routing tables, IP forwarding, BGP, and ICMP utilities.',
      estimatedMinutes: 60,
      lesson: {
        title: 'IP Routing Mechanics',
        content: 'Routers inspect destination IP addresses, matching longest prefix subnets in routing tables to select egress interfaces.',
        interactiveExample: {
          language: 'bash',
          code: 'netstat -rn || route -n',
          explanation: 'Displays kernel IP routing table entries.'
        }
      },
      practice: {
        question: 'Which protocol is used for inter-domain routing between Internet Service Providers (ISPs)?',
        options: [
          { id: 'A', text: 'BGP (Border Gateway Protocol)' },
          { id: 'B', text: 'RIP' },
          { id: 'C', text: 'DHCP' },
          { id: 'D', text: 'ARP' }
        ],
        correctAnswerId: 'A',
        explanation: 'BGP is the core routing protocol of the global Internet.'
      },
      review: {
        title: 'Routing Review',
        pitfalls: ['Routing loops causing packet TTL decrementing down to zero'],
        edgeCases: ['Asymmetric routing where outbound and inbound packets take different paths'],
        keyTakeaway: 'IP header TTL prevents packets from looping infinitely.'
      },
      interview: {
        title: 'Technical Viva: ARP Protocol',
        question: 'What is Address Resolution Protocol (ARP) used for?',
        hint: 'Mapping IP addresses to MAC addresses on local subnets.',
        keyPoints: ['Resolves Layer 3 IP address to Layer 4 MAC address', 'Uses local subnet broadcast ARP requests']
      }
    },
    {
      id: 'cn-m8',
      topicKey: 'network-security',
      title: 'Network Security — TLS, Firewalls & Threats',
      description: 'Master network security controls, firewalls, VPNs, and mitigation.',
      estimatedMinutes: 60,
      lesson: {
        title: 'Network Defense in Depth',
        content: 'Network security implements firewalls (stateless packet filtering & stateful inspection), VPN tunnels, and intrusion detection.',
        interactiveExample: {
          language: 'bash',
          code: 'sudo iptables -A INPUT -p tcp --dport 22 -j DROP',
          explanation: 'Blocks incoming SSH connection attempts on port 22.'
        }
      },
      practice: {
        question: 'What security mechanism establishes an encrypted tunnel over untrusted networks?',
        options: [
          { id: 'A', text: 'VPN (Virtual Private Network)' },
          { id: 'B', text: 'DNS' },
          { id: 'C', text: 'DHCP' },
          { id: 'D', text: 'FTP' }
        ],
        correctAnswerId: 'A',
        explanation: 'VPNs encrypt traffic payloads between endpoints across public IP networks.'
      },
      review: {
        title: 'Network Security Review',
        pitfalls: ['Leaving management ports (SSH/22, RDP/3389) exposed to 0.0.0.0/0 WAN traffic'],
        edgeCases: ['DDoS amplification attacks leveraging open UDP DNS resolvers'],
        keyTakeaway: 'Restrict administrative ingress ports to trusted bastion IP subnets.'
      },
      interview: {
        title: 'Technical Viva: Stateful vs Stateless Firewalls',
        question: 'Compare Stateful Firewalls with Stateless Packet Filters.',
        hint: 'Tracking connection state tables vs inspecting individual headers.',
        keyPoints: ['Stateless filters check IP/port headers of individual packets independently', 'Stateful firewalls maintain connection tracking tables to automatically allow return traffic for established connections']
      }
    }
  ]
};
