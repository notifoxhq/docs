import React from 'react';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

export default function Root({children}) {
  if (ExecutionEnvironment.canUseDOM) {
    // Initialize Google Analytics
    if (!window.dataLayer) {
      window.dataLayer = window.dataLayer || [];
      function gtag(){window.dataLayer.push(arguments);}
      window.gtag = gtag;
      gtag('js', new Date());
      gtag('config', 'G-66WMG1SY0D');
    }
  }
  
  return <>{children}</>;
}

