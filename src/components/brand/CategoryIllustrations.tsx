import React from 'react';
import { TechCategory } from '../../types';

interface IllustrationProps {
  className?: string;
  animate?: boolean;
}

// 1. Data Structures & Algorithms
export const DsaIllustration: React.FC<IllustrationProps> = ({ className = 'w-full h-full', animate = true }) => (
  <svg viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="dsaGrad1" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#7C5CFC" />
        <stop offset="100%" stopColor="#20D9E8" />
      </linearGradient>
      <linearGradient id="dsaGrad2" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#20D9E8" />
        <stop offset="100%" stopColor="#B5F36A" />
      </linearGradient>
      <filter id="dsaGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>

    {/* Background Grid Lines */}
    <path d="M40 30H280M40 70H280M40 110H280M40 150H280M40 190H280" stroke="#1E2638" strokeWidth="1" strokeDasharray="4 4" />
    <path d="M80 20V200M160 20V200M240 20V200" stroke="#1E2638" strokeWidth="1" strokeDasharray="4 4" />

    {/* Tree Hierarchy Structure */}
    {/* Root Node */}
    <circle cx="160" cy="45" r="16" fill="#171D32" stroke="url(#dsaGrad1)" strokeWidth="2.5" />
    <text x="160" y="49" fill="#F8FAFC" fontSize="11" fontFamily="JetBrains Mono" fontWeight="bold" textAnchor="middle">R:42</text>
    <circle cx="160" cy="45" r="22" stroke="#7C5CFC" strokeOpacity="0.4" strokeWidth="1" strokeDasharray="2 2" className={animate ? "animate-spin-slow" : ""} />

    {/* Branches */}
    <path d="M148 57L100 95" stroke="#7C5CFC" strokeWidth="2" strokeDasharray={animate ? "4 2" : "none"} />
    <path d="M172 57L220 95" stroke="#20D9E8" strokeWidth="2" strokeDasharray={animate ? "4 2" : "none"} />

    {/* Level 1 Nodes */}
    <circle cx="95" cy="105" r="14" fill="#171D32" stroke="#7C5CFC" strokeWidth="2" />
    <text x="95" y="109" fill="#F8FAFC" fontSize="10" fontFamily="JetBrains Mono" textAnchor="middle">17</text>

    <circle cx="225" cy="105" r="14" fill="#171D32" stroke="#20D9E8" strokeWidth="2" />
    <text x="225" y="109" fill="#F8FAFC" fontSize="10" fontFamily="JetBrains Mono" textAnchor="middle">89</text>

    {/* Sub Branches */}
    <path d="M85 117L55 155" stroke="#7C5CFC" strokeWidth="1.5" />
    <path d="M105 117L135 155" stroke="#7C5CFC" strokeWidth="1.5" />
    <path d="M215 117L185 155" stroke="#20D9E8" strokeWidth="1.5" />
    <path d="M235 117L265 155" stroke="#20D9E8" strokeWidth="1.5" />

    {/* Level 2 Nodes (Array/Heap) */}
    <rect x="42" y="155" width="26" height="26" rx="6" fill="#202942" stroke="#B5F36A" strokeWidth="1.5" />
    <text x="55" y="172" fill="#B5F36A" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">08</text>

    <rect x="122" y="155" width="26" height="26" rx="6" fill="#202942" stroke="#7C5CFC" strokeWidth="1.5" />
    <text x="135" y="172" fill="#F8FAFC" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">23</text>

    <rect x="172" y="155" width="26" height="26" rx="6" fill="#202942" stroke="#20D9E8" strokeWidth="1.5" />
    <text x="185" y="172" fill="#F8FAFC" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">64</text>

    <rect x="252" y="155" width="26" height="26" rx="6" fill="#202942" stroke="#FF8C66" strokeWidth="1.5" />
    <text x="265" y="172" fill="#FF8C66" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">99</text>

    {/* Graph Traverse Pulsing Edge */}
    <path d="M55 181C100 205 220 205 265 181" stroke="url(#dsaGrad2)" strokeWidth="2" strokeDasharray="3 3" />
    <circle cx="160" cy="201" r="4" fill="#B5F36A" filter="url(#dsaGlow)" />
  </svg>
);

// 2. System Design
export const SystemDesignIllustration: React.FC<IllustrationProps> = ({ className = 'w-full h-full', animate = true }) => (
  <svg viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="sysGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#7C5CFC" />
        <stop offset="100%" stopColor="#20D9E8" />
      </linearGradient>
    </defs>

    {/* Client Request Node */}
    <rect x="20" y="90" width="46" height="40" rx="8" fill="#171D32" stroke="#A3AEC2" strokeWidth="1.5" />
    <text x="43" y="114" fill="#A3AEC2" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">CLIENT</text>

    {/* Arrow Client to Load Balancer */}
    <path d="M66 110H98" stroke="#20D9E8" strokeWidth="2" strokeDasharray="4 2" />
    <polygon points="98,107 104,110 98,113" fill="#20D9E8" />

    {/* Load Balancer */}
    <rect x="105" y="70" width="34" height="80" rx="10" fill="#202942" stroke="#7C5CFC" strokeWidth="2" />
    <text x="122" y="113" fill="#F8FAFC" fontSize="8" fontFamily="JetBrains Mono" textAnchor="middle" transform="rotate(-90 122 113)">GATEWAY</text>

    {/* Fanout to Microservices */}
    <path d="M139 90C160 90 165 45 185 45" stroke="#7C5CFC" strokeWidth="1.5" />
    <path d="M139 110H185" stroke="#20D9E8" strokeWidth="1.5" />
    <path d="M139 130C160 130 165 175 185 175" stroke="#B5F36A" strokeWidth="1.5" />

    {/* Microservices Pods */}
    <g>
      <rect x="185" y="28" width="56" height="34" rx="6" fill="#171D32" stroke="#7C5CFC" strokeWidth="1.5" />
      <text x="213" y="49" fill="#F8FAFC" fontSize="8" fontFamily="JetBrains Mono" textAnchor="middle">AUTH_SVC</text>
      <circle cx="193" cy="36" r="2.5" fill="#B5F36A" />

      <rect x="185" y="93" width="56" height="34" rx="6" fill="#171D32" stroke="#20D9E8" strokeWidth="1.5" />
      <text x="213" y="114" fill="#F8FAFC" fontSize="8" fontFamily="JetBrains Mono" textAnchor="middle">ORDER_SVC</text>
      <circle cx="193" cy="101" r="2.5" fill="#20D9E8" />

      <rect x="185" y="158" width="56" height="34" rx="6" fill="#171D32" stroke="#B5F36A" strokeWidth="1.5" />
      <text x="213" y="179" fill="#F8FAFC" fontSize="8" fontFamily="JetBrains Mono" textAnchor="middle">PAY_SVC</text>
      <circle cx="193" cy="166" r="2.5" fill="#FF8C66" />
    </g>

    {/* Cache & DB Layer */}
    <path d="M241 45H270" stroke="#7C5CFC" strokeWidth="1.5" />
    <path d="M241 110H270" stroke="#20D9E8" strokeWidth="1.5" />
    <path d="M241 175H270" stroke="#B5F36A" strokeWidth="1.5" />

    {/* Redis Cache */}
    <rect x="270" y="32" width="36" height="26" rx="4" fill="#202942" stroke="#FF8C66" strokeWidth="1.5" />
    <text x="288" y="48" fill="#FF8C66" fontSize="7" fontFamily="JetBrains Mono" textAnchor="middle">REDIS</text>

    {/* Distributed DB Cylinder */}
    <g transform="translate(268, 115)">
      <path d="M0 6C0 2.5 8 0 20 0C32 0 40 2.5 40 6V40C40 43.5 32 46 20 46C8 46 0 43.5 0 40V6Z" fill="#171D32" stroke="url(#sysGrad)" strokeWidth="1.5" />
      <ellipse cx="20" cy="6" rx="20" ry="6" fill="#202942" stroke="url(#sysGrad)" strokeWidth="1.5" />
      <ellipse cx="20" cy="20" rx="18" ry="4" stroke="#2A3348" strokeWidth="1" strokeDasharray="2 2" />
      <text x="20" y="32" fill="#20D9E8" fontSize="8" fontFamily="JetBrains Mono" textAnchor="middle">SQL_R</text>
    </g>
  </svg>
);

// 3. Docker & DevOps
export const DockerDevopsIllustration: React.FC<IllustrationProps> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="dockerGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#20D9E8" />
        <stop offset="100%" stopColor="#7C5CFC" />
      </linearGradient>
    </defs>

    {/* Host OS Layer Base */}
    <rect x="40" y="165" width="240" height="32" rx="6" fill="#11182A" stroke="#2A3348" strokeWidth="1.5" />
    <text x="160" y="185" fill="#A3AEC2" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">HOST OS KERNEL (cgroups & namespaces)</text>

    {/* Docker Engine Daemon Layer */}
    <rect x="40" y="125" width="240" height="30" rx="6" fill="#171D32" stroke="#20D9E8" strokeWidth="1.5" />
    <text x="160" y="144" fill="#20D9E8" fontSize="9" fontFamily="JetBrains Mono" fontWeight="bold" textAnchor="middle">CONTAINERD / DOCKER ENGINE</text>

    {/* Container Pod 1 */}
    <g transform="translate(48, 30)">
      <rect x="0" y="0" width="65" height="85" rx="6" fill="#202942" stroke="#7C5CFC" strokeWidth="1.5" />
      <rect x="4" y="6" width="57" height="18" rx="3" fill="#7C5CFC" fillOpacity="0.3" />
      <text x="32" y="18" fill="#F8FAFC" fontSize="7" fontFamily="JetBrains Mono" textAnchor="middle">APP: NODE</text>
      <rect x="4" y="28" width="57" height="15" rx="3" fill="#171D32" stroke="#2A3348" />
      <text x="32" y="39" fill="#A3AEC2" fontSize="6.5" fontFamily="JetBrains Mono" textAnchor="middle">DEPS/LIBS</text>
      <rect x="4" y="47" width="57" height="15" rx="3" fill="#171D32" stroke="#2A3348" />
      <text x="32" y="58" fill="#A3AEC2" fontSize="6.5" fontFamily="JetBrains Mono" textAnchor="middle">ALPINE LINUX</text>
      <circle cx="32" cy="74" r="4" fill="#B5F36A" />
    </g>

    {/* Container Pod 2 */}
    <g transform="translate(128, 30)">
      <rect x="0" y="0" width="65" height="85" rx="6" fill="#202942" stroke="#20D9E8" strokeWidth="1.5" />
      <rect x="4" y="6" width="57" height="18" rx="3" fill="#20D9E8" fillOpacity="0.3" />
      <text x="32" y="18" fill="#F8FAFC" fontSize="7" fontFamily="JetBrains Mono" textAnchor="middle">APP: PYTHON</text>
      <rect x="4" y="28" width="57" height="15" rx="3" fill="#171D32" stroke="#2A3348" />
      <text x="32" y="39" fill="#A3AEC2" fontSize="6.5" fontFamily="JetBrains Mono" textAnchor="middle">PYTORCH</text>
      <rect x="4" y="47" width="57" height="15" rx="3" fill="#171D32" stroke="#2A3348" />
      <text x="32" y="58" fill="#A3AEC2" fontSize="6.5" fontFamily="JetBrains Mono" textAnchor="middle">UBUNTU BASE</text>
      <circle cx="32" cy="74" r="4" fill="#20D9E8" />
    </g>

    {/* Container Pod 3 */}
    <g transform="translate(208, 30)">
      <rect x="0" y="0" width="65" height="85" rx="6" fill="#202942" stroke="#FF8C66" strokeWidth="1.5" />
      <rect x="4" y="6" width="57" height="18" rx="3" fill="#FF8C66" fillOpacity="0.3" />
      <text x="32" y="18" fill="#F8FAFC" fontSize="7" fontFamily="JetBrains Mono" textAnchor="middle">APP: NGINX</text>
      <rect x="4" y="28" width="57" height="15" rx="3" fill="#171D32" stroke="#2A3348" />
      <text x="32" y="39" fill="#A3AEC2" fontSize="6.5" fontFamily="JetBrains Mono" textAnchor="middle">CONF/SSL</text>
      <rect x="4" y="47" width="57" height="15" rx="3" fill="#171D32" stroke="#2A3348" />
      <text x="32" y="58" fill="#A3AEC2" fontSize="6.5" fontFamily="JetBrains Mono" textAnchor="middle">DEBIAN SLIM</text>
      <circle cx="32" cy="74" r="4" fill="#FF8C66" />
    </g>
  </svg>
);

// 4. Artificial Intelligence
export const AiIllustration: React.FC<IllustrationProps> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="aiGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#7C5CFC" />
        <stop offset="50%" stopColor="#20D9E8" />
        <stop offset="100%" stopColor="#B5F36A" />
      </linearGradient>
    </defs>

    {/* Neural Interconnections */}
    {/* Input Layer to Hidden Layer 1 */}
    {[50, 95, 140, 185].map((y1, i) =>
      [40, 75, 110, 145, 180].map((y2, j) => (
        <line key={`l1-${i}-${j}`} x1="50" y1={y1} x2="130" y2={y2} stroke="#7C5CFC" strokeOpacity={0.15 + (i * j) % 3 * 0.1} strokeWidth="1" />
      ))
    )}

    {/* Hidden 1 to Hidden 2 */}
    {[40, 75, 110, 145, 180].map((y1, i) =>
      [55, 95, 135, 175].map((y2, j) => (
        <line key={`l2-${i}-${j}`} x1="130" y1={y1} x2="200" y2={y2} stroke="#20D9E8" strokeOpacity={0.15 + (i + j) % 3 * 0.1} strokeWidth="1" />
      ))
    )}

    {/* Hidden 2 to Output */}
    {[55, 95, 135, 175].map((y1, i) =>
      [80, 140].map((y2, j) => (
        <line key={`l3-${i}-${j}`} x1="200" y1={y1} x2="270" y2={y2} stroke="#B5F36A" strokeOpacity={0.3} strokeWidth="1.5" />
      ))
    )}

    {/* Input Nodes */}
    {[50, 95, 140, 185].map((y, i) => (
      <g key={`in-${i}`}>
        <circle cx="50" cy={y} r="10" fill="#171D32" stroke="#7C5CFC" strokeWidth="2" />
        <circle cx="50" cy={y} r="4" fill="#7C5CFC" />
      </g>
    ))}

    {/* Hidden Layer 1 */}
    {[40, 75, 110, 145, 180].map((y, i) => (
      <g key={`h1-${i}`}>
        <circle cx="130" cy={y} r="10" fill="#171D32" stroke="#20D9E8" strokeWidth="2" />
        <circle cx="130" cy={y} r="3.5" fill="#20D9E8" />
      </g>
    ))}

    {/* Hidden Layer 2 (Transformer Attention Head) */}
    {[55, 95, 135, 175].map((y, i) => (
      <g key={`h2-${i}`}>
        <circle cx="200" cy={y} r="10" fill="#202942" stroke="url(#aiGrad)" strokeWidth="2" />
        <circle cx="200" cy={y} r="4" fill="#B5F36A" />
      </g>
    ))}

    {/* Output Layer */}
    {[80, 140].map((y, i) => (
      <g key={`out-${i}`}>
        <circle cx="270" cy={y} r="14" fill="#171D32" stroke="#B5F36A" strokeWidth="2.5" />
        <text x="270" y={y + 4} fill="#B5F36A" fontSize="9" fontFamily="JetBrains Mono" fontWeight="bold" textAnchor="middle">
          {i === 0 ? 'P(y)' : 'Y_hat'}
        </text>
      </g>
    ))}

    <text x="160" y="210" fill="#A3AEC2" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">MULTI-HEAD SELF ATTENTION & TENSOR OPS</text>
  </svg>
);

// 5. Computer Networks
export const NetworksIllustration: React.FC<IllustrationProps> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Global Ring */}
    <circle cx="160" cy="110" r="85" stroke="#1E2638" strokeWidth="1.5" strokeDasharray="6 6" />
    <circle cx="160" cy="110" r="50" stroke="#2A3348" strokeWidth="1" />

    {/* Central Router Core */}
    <circle cx="160" cy="110" r="22" fill="#171D32" stroke="#20D9E8" strokeWidth="2.5" />
    <text x="160" y="114" fill="#20D9E8" fontSize="9" fontFamily="JetBrains Mono" fontWeight="bold" textAnchor="middle">BGP_ROUTER</text>

    {/* Network Nodes */}
    <g>
      {/* Node 1 (Top) */}
      <circle cx="160" cy="25" r="14" fill="#202942" stroke="#7C5CFC" strokeWidth="2" />
      <text x="160" y="29" fill="#F8FAFC" fontSize="8" fontFamily="JetBrains Mono" textAnchor="middle">DNS</text>
      <line x1="160" y1="39" x2="160" y2="88" stroke="#7C5CFC" strokeWidth="2" strokeDasharray="4 2" />

      {/* Node 2 (Right) */}
      <circle cx="245" cy="110" r="14" fill="#202942" stroke="#B5F36A" strokeWidth="2" />
      <text x="245" y="114" fill="#B5F36A" fontSize="8" fontFamily="JetBrains Mono" textAnchor="middle">TCP</text>
      <line x1="182" y1="110" x2="231" y2="110" stroke="#B5F36A" strokeWidth="2" strokeDasharray="4 2" />

      {/* Node 3 (Bottom) */}
      <circle cx="160" cy="195" r="14" fill="#202942" stroke="#FF8C66" strokeWidth="2" />
      <text x="160" y="199" fill="#FF8C66" fontSize="8" fontFamily="JetBrains Mono" textAnchor="middle">TLS</text>
      <line x1="160" y1="132" x2="160" y2="181" stroke="#FF8C66" strokeWidth="2" strokeDasharray="4 2" />

      {/* Node 4 (Left) */}
      <circle cx="75" cy="110" r="14" fill="#202942" stroke="#20D9E8" strokeWidth="2" />
      <text x="75" y="114" fill="#20D9E8" fontSize="8" fontFamily="JetBrains Mono" textAnchor="middle">IP/ETH</text>
      <line x1="89" y1="110" x2="138" y2="110" stroke="#20D9E8" strokeWidth="2" strokeDasharray="4 2" />
    </g>

    {/* Moving Packets */}
    <rect x="156" y="55" width="8" height="12" rx="2" fill="#20D9E8" />
    <rect x="200" y="106" width="12" height="8" rx="2" fill="#B5F36A" />
  </svg>
);

// 6. Operating Systems
export const OsIllustration: React.FC<IllustrationProps> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* CPU Core Box */}
    <rect x="25" y="45" width="105" height="130" rx="8" fill="#171D32" stroke="#7C5CFC" strokeWidth="2" />
    <text x="77" y="70" fill="#7C5CFC" fontSize="10" fontFamily="JetBrains Mono" fontWeight="bold" textAnchor="middle">CPU REGISTERS</text>
    <rect x="37" y="80" width="81" height="20" rx="4" fill="#202942" stroke="#2A3348" />
    <text x="77" y="93" fill="#F8FAFC" fontSize="8" fontFamily="JetBrains Mono" textAnchor="middle">PC: 0x7FFF0A</text>
    <rect x="37" y="106" width="81" height="20" rx="4" fill="#202942" stroke="#2A3348" />
    <text x="77" y="119" fill="#20D9E8" fontSize="8" fontFamily="JetBrains Mono" textAnchor="middle">SP: 0x002B4F</text>
    <rect x="37" y="132" width="81" height="20" rx="4" fill="#202942" stroke="#2A3348" />
    <text x="77" y="145" fill="#B5F36A" fontSize="8" fontFamily="JetBrains Mono" textAnchor="middle">FLAGS: 0b1001</text>

    {/* Memory Bus Lines */}
    <path d="M130 90H170M130 110H170M130 130H170" stroke="#20D9E8" strokeWidth="1.5" strokeDasharray="3 3" />

    {/* Virtual Memory Stack/Heap Box */}
    <rect x="170" y="25" width="125" height="170" rx="8" fill="#171D32" stroke="#20D9E8" strokeWidth="2" />
    <text x="232" y="45" fill="#20D9E8" fontSize="10" fontFamily="JetBrains Mono" fontWeight="bold" textAnchor="middle">VIRTUAL ADDRESS</text>
    
    <rect x="180" y="55" width="105" height="26" rx="4" fill="#7C5CFC" fillOpacity="0.4" stroke="#7C5CFC" />
    <text x="232" y="72" fill="#F8FAFC" fontSize="8" fontFamily="JetBrains Mono" textAnchor="middle">KERNEL SPACE</text>

    <rect x="180" y="87" width="105" height="24" rx="4" fill="#202942" stroke="#B5F36A" />
    <text x="232" y="102" fill="#B5F36A" fontSize="8" fontFamily="JetBrains Mono" textAnchor="middle">STACK ↓</text>

    <rect x="180" y="116" width="105" height="24" rx="4" fill="#202942" stroke="#FF8C66" />
    <text x="232" y="131" fill="#FF8C66" fontSize="8" fontFamily="JetBrains Mono" textAnchor="middle">HEAP ↑ (MALLOC)</text>

    <rect x="180" y="145" width="105" height="38" rx="4" fill="#11182A" stroke="#2A3348" />
    <text x="232" y="167" fill="#A3AEC2" fontSize="8" fontFamily="JetBrains Mono" textAnchor="middle">DATA & TEXT (CODE)</text>
  </svg>
);

// 7. DBMS
export const DbmsIllustration: React.FC<IllustrationProps> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* B+ Tree Index Structure */}
    <g transform="translate(10, 20)">
      {/* Root Node */}
      <rect x="105" y="10" width="90" height="28" rx="5" fill="#171D32" stroke="#7C5CFC" strokeWidth="2" />
      <line x1="150" y1="10" x2="150" y2="38" stroke="#7C5CFC" strokeWidth="1" />
      <text x="127" y="27" fill="#F8FAFC" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">20</text>
      <text x="172" y="27" fill="#F8FAFC" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">50</text>

      {/* Pointers */}
      <path d="M127 38L65 65" stroke="#7C5CFC" strokeWidth="1.5" />
      <path d="M150 38L150 65" stroke="#20D9E8" strokeWidth="1.5" />
      <path d="M172 38L235 65" stroke="#B5F36A" strokeWidth="1.5" />

      {/* Leaf Nodes */}
      <rect x="25" y="65" width="80" height="26" rx="4" fill="#202942" stroke="#7C5CFC" strokeWidth="1.5" />
      <text x="65" y="81" fill="#F8FAFC" fontSize="8" fontFamily="JetBrains Mono" textAnchor="middle">10 | 15</text>

      <rect x="115" y="65" width="70" height="26" rx="4" fill="#202942" stroke="#20D9E8" strokeWidth="1.5" />
      <text x="150" y="81" fill="#20D9E8" fontSize="8" fontFamily="JetBrains Mono" textAnchor="middle">30 | 45</text>

      <rect x="195" y="65" width="80" height="26" rx="4" fill="#202942" stroke="#B5F36A" strokeWidth="1.5" />
      <text x="235" y="81" fill="#B5F36A" fontSize="8" fontFamily="JetBrains Mono" textAnchor="middle">60 | 95</text>

      {/* Leaf Linked List Arrows */}
      <path d="M105 78H115" stroke="#A3AEC2" strokeWidth="1.5" />
      <path d="M185 78H195" stroke="#A3AEC2" strokeWidth="1.5" />
    </g>

    {/* Write Ahead Log (WAL) Banner */}
    <rect x="35" y="145" width="250" height="42" rx="6" fill="#171D32" stroke="#FF8C66" strokeWidth="1.5" />
    <text x="160" y="162" fill="#FF8C66" fontSize="9" fontFamily="JetBrains Mono" fontWeight="bold" textAnchor="middle">WAL (WRITE-AHEAD LOG) & ACID ENGINE</text>
    <text x="160" y="177" fill="#A3AEC2" fontSize="7.5" fontFamily="JetBrains Mono" textAnchor="middle">[TX_START 94] → [UPDATE acct SET bal=950] → [TX_COMMIT]</text>
  </svg>
);

// 8. Web Development
export const WebDevIllustration: React.FC<IllustrationProps> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Browser Window Frame */}
    <rect x="25" y="25" width="270" height="170" rx="8" fill="#171D32" stroke="#2A3348" strokeWidth="2" />
    
    {/* Browser Header Bar */}
    <path d="M25 33C25 28.5 28.5 25 33 25H287C291.5 25 295 28.5 295 33V50H25V33Z" fill="#202942" />
    <circle cx="42" cy="37" r="3.5" fill="#FF8C66" />
    <circle cx="54" cy="37" r="3.5" fill="#B5F36A" />
    <circle cx="66" cy="37" r="3.5" fill="#20D9E8" />
    
    {/* Address Bar */}
    <rect x="85" y="30" width="180" height="15" rx="4" fill="#0B1020" stroke="#2A3348" strokeWidth="1" />
    <text x="95" y="41" fill="#A3AEC2" fontSize="8" fontFamily="JetBrains Mono">https://nexora.dev/explore</text>

    {/* DOM / Component Tree inside Browser */}
    <g transform="translate(35, 65)">
      {/* App Component */}
      <rect x="90" y="5" width="70" height="24" rx="4" fill="#7C5CFC" fillOpacity="0.3" stroke="#7C5CFC" strokeWidth="1.5" />
      <text x="125" y="20" fill="#F8FAFC" fontSize="8" fontFamily="JetBrains Mono" textAnchor="middle">&lt;Layout /&gt;</text>

      {/* Children branches */}
      <path d="M105 29L45 55" stroke="#7C5CFC" strokeWidth="1.5" />
      <path d="M125 29L125 55" stroke="#20D9E8" strokeWidth="1.5" />
      <path d="M145 29L205 55" stroke="#B5F36A" strokeWidth="1.5" />

      {/* Child Components */}
      <rect x="10" y="55" width="70" height="24" rx="4" fill="#202942" stroke="#7C5CFC" strokeWidth="1.5" />
      <text x="45" y="70" fill="#F8FAFC" fontSize="7.5" fontFamily="JetBrains Mono" textAnchor="middle">&lt;Navbar /&gt;</text>

      <rect x="90" y="55" width="70" height="24" rx="4" fill="#202942" stroke="#20D9E8" strokeWidth="1.5" />
      <text x="125" y="70" fill="#20D9E8" fontSize="7.5" fontFamily="JetBrains Mono" textAnchor="middle">&lt;Canvas /&gt;</text>

      <rect x="170" y="55" width="70" height="24" rx="4" fill="#202942" stroke="#B5F36A" strokeWidth="1.5" />
      <text x="205" y="70" fill="#B5F36A" fontSize="7.5" fontFamily="JetBrains Mono" textAnchor="middle">&lt;Viewer /&gt;</text>

      {/* Reactive State Tag */}
      <rect x="45" y="95" width="160" height="20" rx="4" fill="#0B1020" stroke="#20D9E8" strokeDasharray="3 2" />
      <text x="125" y="108" fill="#20D9E8" fontSize="7.5" fontFamily="JetBrains Mono" textAnchor="middle">REACT DOM RECONCILIATION</text>
    </g>
  </svg>
);

// 9. Cloud Computing
export const CloudIllustration: React.FC<IllustrationProps> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Cloud Mesh Silhouette */}
    <path 
      d="M100 135H230C250 135 265 120 265 102C265 85 252 72 235 70C233 48 214 30 190 30C172 30 156 41 148 56C142 52 135 50 127 50C110 50 95 63 94 80C78 83 65 97 65 114C65 130 80 135 100 135Z" 
      fill="#171D32" 
      stroke="#7C5CFC" 
      strokeWidth="2" 
    />

    {/* Cloud Region Nodes */}
    <circle cx="125" cy="90" r="12" fill="#202942" stroke="#20D9E8" strokeWidth="1.5" />
    <text x="125" y="94" fill="#20D9E8" fontSize="7" fontFamily="JetBrains Mono" textAnchor="middle">US-E</text>

    <circle cx="190" cy="80" r="14" fill="#202942" stroke="#B5F36A" strokeWidth="1.5" />
    <text x="190" y="84" fill="#B5F36A" fontSize="7.5" fontFamily="JetBrains Mono" textAnchor="middle">EU-W</text>

    <circle cx="155" cy="112" r="10" fill="#202942" stroke="#FF8C66" strokeWidth="1.5" />
    <text x="155" y="115" fill="#FF8C66" fontSize="6.5" fontFamily="JetBrains Mono" textAnchor="middle">AP-S</text>

    {/* Inter-Region VPC Peering */}
    <line x1="137" y1="88" x2="176" y2="82" stroke="#7C5CFC" strokeWidth="1.5" strokeDasharray="3 2" />
    <line x1="133" y1="99" x2="147" y2="108" stroke="#20D9E8" strokeWidth="1.5" strokeDasharray="3 2" />
    <line x1="182" y1="91" x2="163" y2="106" stroke="#B5F36A" strokeWidth="1.5" strokeDasharray="3 2" />

    {/* Serverless/Edge Lambda Pods below */}
    <g transform="translate(50, 155)">
      <rect x="0" y="0" width="65" height="32" rx="6" fill="#11182A" stroke="#20D9E8" strokeWidth="1.5" />
      <text x="32" y="16" fill="#20D9E8" fontSize="7" fontFamily="JetBrains Mono" textAnchor="middle">LAMBDA</text>
      <text x="32" y="25" fill="#A3AEC2" fontSize="6" fontFamily="JetBrains Mono" textAnchor="middle">COLD: 12ms</text>

      <rect x="80" y="0" width="65" height="32" rx="6" fill="#11182A" stroke="#7C5CFC" strokeWidth="1.5" />
      <text x="112" y="16" fill="#7C5CFC" fontSize="7" fontFamily="JetBrains Mono" textAnchor="middle">S3 BUCKET</text>
      <text x="112" y="25" fill="#A3AEC2" fontSize="6" fontFamily="JetBrains Mono" textAnchor="middle">99.9999999%</text>

      <rect x="160" y="0" width="65" height="32" rx="6" fill="#11182A" stroke="#B5F36A" strokeWidth="1.5" />
      <text x="192" y="16" fill="#B5F36A" fontSize="7" fontFamily="JetBrains Mono" textAnchor="middle">CDN EDGE</text>
      <text x="192" y="25" fill="#A3AEC2" fontSize="6" fontFamily="JetBrains Mono" textAnchor="middle">TTL: 3600s</text>
    </g>
  </svg>
);

// 10. Cybersecurity
export const CybersecurityIllustration: React.FC<IllustrationProps> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Shield Boundary Outline */}
    <path 
      d="M160 25L235 55V110C235 155 160 190 160 190C160 190 85 155 85 110V55L160 25Z" 
      fill="#171D32" 
      stroke="#7C5CFC" 
      strokeWidth="2.5" 
    />
    <path 
      d="M160 38L220 62V108C220 144 160 174 160 174C160 174 100 144 100 108V62L160 38Z" 
      fill="#202942" 
      fillOpacity="0.4"
      stroke="#20D9E8" 
      strokeWidth="1.5" 
      strokeDasharray="4 2"
    />

    {/* Glowing Crypto Key Lock Center */}
    <circle cx="160" cy="95" r="16" fill="#11182A" stroke="#B5F36A" strokeWidth="2" />
    <path d="M154 95C154 91.5 156.5 89 160 89C163.5 89 166 91.5 166 95V101H154V95Z" fill="#B5F36A" />
    <rect x="150" y="101" width="20" height="16" rx="3" fill="#B5F36A" />
    <circle cx="160" cy="108" r="2.5" fill="#11182A" />

    {/* Encrypted Hash Hex Output */}
    <g transform="translate(45, 160)">
      <rect x="0" y="0" width="230" height="24" rx="4" fill="#0B1020" stroke="#2A3348" />
      <text x="115" y="15" fill="#20D9E8" fontSize="7.5" fontFamily="JetBrains Mono" textAnchor="middle">SHA256: e3b0c44298fc1c149afbf4c8996fb92427...</text>
    </g>

    {/* Zero Trust Badges */}
    <text x="160" y="145" fill="#F8FAFC" fontSize="9" fontFamily="JetBrains Mono" fontWeight="bold" textAnchor="middle">ZERO TRUST ARCHITECTURE</text>
  </svg>
);

export const CategoryIllustration: React.FC<{ category: TechCategory; className?: string }> = ({ category, className }) => {
  switch (category) {
    case 'Data Structures & Algorithms':
      return <DsaIllustration className={className} />;
    case 'System Design':
      return <SystemDesignIllustration className={className} />;
    case 'Docker & DevOps':
      return <DockerDevopsIllustration className={className} />;
    case 'Artificial Intelligence':
      return <AiIllustration className={className} />;
    case 'Computer Networks':
      return <NetworksIllustration className={className} />;
    case 'Operating Systems':
      return <OsIllustration className={className} />;
    case 'DBMS':
      return <DbmsIllustration className={className} />;
    case 'Web Development':
      return <WebDevIllustration className={className} />;
    case 'Cloud Computing':
      return <CloudIllustration className={className} />;
    case 'Cybersecurity':
      return <CybersecurityIllustration className={className} />;
    default:
      return <SystemDesignIllustration className={className} />;
  }
};
