const express = require('express');
const cors = require('cors');
const path = require('path');
const https = require('https');
const http = require('http');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// In-memory store for health check logs & reported issues
const healthCheckLogs = [];

// Helper to check page availability natively in Node.js (100% Free)
function checkUrlNative(targetUrl) {
  return new Promise((resolve) => {
    const startTime = Date.now();
    const client = targetUrl.startsWith('https') ? https : http;

    const req = client.get(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 QA-Monitor/1.0'
      },
      timeout: 10000
    }, (res) => {
      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
        if (body.length > 50000) req.destroy();
      });
      res.on('end', () => {
        const elapsed = Date.now() - startTime;
        const statusCode = res.statusCode || 200;
        const lowerBody = body.toLowerCase();
        
        const soft404Keywords = ['page not found', 'product not found', 'item unavailable', '404 not found', 'server error', 'something went wrong'];
        let isSoft404 = false;
        for (let kw of soft404Keywords) {
          if (lowerBody.includes(kw)) {
            isSoft404 = true;
            break;
          }
        }

        const isHealthy = statusCode === 200 && !isSoft404 && body.trim().length > 100;
        resolve({
          statusCode,
          isHealthy,
          isSoft404,
          responseTimeMs: elapsed,
          failureReason: !isHealthy ? (statusCode !== 200 ? `HTTP ${statusCode}` : (isSoft404 ? 'Soft 404 text detected in HTML' : 'Empty Response')) : ''
        });
      });
    });

    req.on('error', (err) => {
      resolve({ statusCode: 500, isHealthy: false, isSoft404: false, responseTimeMs: 0, failureReason: err.message });
    });
    req.on('timeout', () => {
      req.destroy();
      resolve({ statusCode: 504, isHealthy: false, isSoft404: false, responseTimeMs: 10000, failureReason: 'Connection Timeout (10s)' });
    });
  });
}

// Operational Time Windows Helper
function getTimeWindowTag(dateObj = new Date()) {
  const hour = dateObj.getHours();
  if (hour >= 4 && hour <= 6) return "Morning Shift (4 AM - 6 AM)";
  if (hour >= 13 && hour <= 15) return "Afternoon Shift (1 PM - 3 PM)";
  if (hour >= 18 && hour <= 21) return "Evening Shift (6 PM - 9 PM)";
  if (hour === 23 || hour === 0) return "Night Shift (11 PM - 12 AM)";
  return "Manual / Off-Peak Run";
}

// Endpoint to receive health results from n8n webhook or manual trigger
app.post('/api/webhook/health-results', (req, res) => {
  const data = req.body;
  if (data) {
    const timeWindow = data.timeWindow || getTimeWindowTag();
    const logItem = {
      ...data,
      timeWindow,
      receivedAt: new Date().toISOString()
    };
    healthCheckLogs.unshift(logItem);
    if (healthCheckLogs.length > 300) healthCheckLogs.pop();
  }
  res.json({ success: true, message: 'Health log recorded' });
});

// Endpoint to get latest health check logs
app.get('/api/health-logs', (req, res) => {
  res.json({ success: true, logs: healthCheckLogs });
});

// Endpoint to get Schedule Window Execution Summary
app.get('/api/schedule-summary', (req, res) => {
  const now = new Date();
  const currentHour = now.getHours();

  const windowsConfig = [
    { key: 'morning', label: 'Morning Shift', hours: '4:00 AM - 6:00 AM', startHour: 4, endHour: 6, tag: 'Morning Shift (4 AM - 6 AM)' },
    { key: 'afternoon', label: 'Afternoon Shift', hours: '1:00 PM - 3:00 PM', startHour: 13, endHour: 15, tag: 'Afternoon Shift (1 PM - 3 PM)' },
    { key: 'evening', label: 'Evening Shift', hours: '6:00 PM - 9:00 PM', startHour: 18, endHour: 21, tag: 'Evening Shift (6 PM - 9 PM)' },
    { key: 'night', label: 'Night Shift', hours: '11:00 PM - 12:00 AM', startHour: 23, endHour: 24, tag: 'Night Shift (11 PM - 12 AM)' }
  ];

  const summary = windowsConfig.map(win => {
    const matchingLogs = healthCheckLogs.filter(l => l.timeWindow === win.tag || (l.timeWindow && l.timeWindow.includes(win.label)));
    const totalRuns = matchingLogs.length;
    const outageLogs = matchingLogs.filter(l => !l.isHealthy);
    const hasOutages = outageLogs.length > 0;
    const lastLog = matchingLogs[0];

    let isActiveNow = false;
    if (win.key === 'night') {
      isActiveNow = (currentHour === 23 || currentHour === 0);
    } else {
      isActiveNow = (currentHour >= win.startHour && currentHour <= win.endHour);
    }

    return {
      key: win.key,
      label: win.label,
      hours: win.hours,
      tag: win.tag,
      isActiveNow,
      totalRuns,
      outagesCount: outageLogs.length,
      status: totalRuns === 0 ? 'upcoming' : (hasOutages ? 'outage' : 'healthy'),
      lastExecuted: lastLog ? new Date(lastLog.receivedAt || lastLog.timestamp).toLocaleTimeString() : 'Not executed today'
    };
  });

  res.json({ success: true, summary, currentTime: now.toLocaleTimeString() });
});

// Direct Local Audit Endpoint (100% Free & Independent of n8n)
app.post('/api/run-local-audit', async (req, res) => {
  const { urls } = req.body;
  if (!urls || !Array.isArray(urls)) {
    return res.status(400).json({ success: false, message: 'Invalid URLs array' });
  }

  const timeWindow = getTimeWindowTag();
  const results = [];

  for (let item of urls) {
    const health = await checkUrlNative(item.url);
    const itemResult = {
      ...item,
      ...health,
      timeWindow,
      lastChecked: new Date().toLocaleTimeString()
    };
    results.push(itemResult);

    // Push into server log history as well
    healthCheckLogs.unshift({
      module_name: item.name,
      category: item.category,
      url: item.url,
      statusCode: health.statusCode,
      isHealthy: health.isHealthy,
      isSoft404: health.isSoft404,
      failureReason: health.failureReason,
      responseTimeMs: health.responseTimeMs,
      timeWindow,
      receivedAt: new Date().toISOString()
    });
  }

  if (healthCheckLogs.length > 300) healthCheckLogs.splice(300);

  res.json({ success: true, timeWindow, results });
});

// Start server (when run directly via `node server.js`)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`🚀 IndiaMART QA Health Monitor Dashboard running at:`);
    console.log(`👉 http://localhost:${PORT}`);
    console.log(`====================================================`);
  });
}

module.exports = app;
