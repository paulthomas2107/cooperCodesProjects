import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://vlkhfonmpxhemogeddze.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZsa2hmb25tcHhoZW1vZ2VkZHplIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzA0MjgzMTEsImV4cCI6MTk4NjAwNDMxMX0.jqZv6wxK60MnsfTCQw-tq9z2rfVo2XPIF4DjBaIcmi0'
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SessionContextProvider supabaseClient={supabase}>
      <App />
    </SessionContextProvider>
  </React.StrictMode>
);
