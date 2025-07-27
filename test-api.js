#!/usr/bin/env node

// Simple API test script
const API_URL = 'https://api.drganeshcs.com/api';

async function testAPI() {
  console.log('🔍 Testing API connection...\n');
  
  try {
    // Test health endpoint
    console.log('1. Testing health endpoint...');
    const healthResponse = await fetch(`${API_URL}/health`);
    const healthData = await healthResponse.json();
    console.log('✅ Health check:', healthData.status);
    
    // Test doctor login
    console.log('\n2. Testing doctor login...');
    const loginResponse = await fetch(`${API_URL}/auth/doctor-login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        loginType: 'password',
        email: 'doctor@drganeshcs.com',
        password: 'DrGanesh2024!'
      })
    });
    
    if (loginResponse.ok) {
      const loginData = await loginResponse.json();
      console.log('✅ Doctor login successful');
      
      // Test authenticated endpoint
      console.log('\n3. Testing authenticated endpoint...');
      const appointmentsResponse = await fetch(`${API_URL}/appointments/all`, {
        headers: {
          'Authorization': `Bearer ${loginData.token}`
        }
      });
      
      if (appointmentsResponse.ok) {
        const appointmentsData = await appointmentsResponse.json();
        console.log(`✅ Appointments fetched: ${appointmentsData.total} total`);
      } else {
        console.log('❌ Failed to fetch appointments');
      }
    } else {
      console.log('❌ Doctor login failed');
    }
    
    console.log('\n🎉 API tests completed!');
    
  } catch (error) {
    console.error('❌ API test failed:', error.message);
  }
}

testAPI();
