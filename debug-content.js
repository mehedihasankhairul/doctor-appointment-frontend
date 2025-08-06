#!/usr/bin/env node

// Debug script for content API issues
const API_URL = 'https://api.drganeshcs.com/api';

async function testContentAPI() {
  console.log('🔍 Testing Content API functionality...\n');
  
  try {
    // Test 1: Health check
    console.log('1. Testing health endpoint...');
    const healthResponse = await fetch(`${API_URL}/health`);
    const healthData = await healthResponse.json();
    console.log('✅ Health check:', healthData.status);
    
    // Test 2: Try to get existing content (should work)
    console.log('\n2. Testing GET content endpoint...');
    const contentResponse = await fetch(`${API_URL}/content`);
    if (contentResponse.ok) {
      const contentData = await contentResponse.json();
      console.log('✅ Content GET successful:', contentData.content?.length || 0, 'items found');
    } else {
      console.log('❌ Content GET failed:', await contentResponse.text());
    }
    
    // Test 3: Doctor login (with retry logic)
    console.log('\n3. Testing doctor login...');
    let loginSuccess = false;
    let authToken = null;
    
    // Try with different credentials
    const loginCredentials = [
      { loginType: 'password', email: 'doctor@drganeshcs.com', password: 'DrGanesh2024!' },
      { loginType: 'pin', pin: '123456' }
    ];
    
    for (const creds of loginCredentials) {
      try {
        const loginResponse = await fetch(`${API_URL}/auth/doctor-login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(creds)
        });
        
        if (loginResponse.ok) {
          const loginData = await loginResponse.json();
          authToken = loginData.token;
          loginSuccess = true;
          console.log('✅ Login successful with:', creds.loginType);
          break;
        } else {
          console.log(`❌ Login failed with ${creds.loginType}:`, await loginResponse.text());
        }
      } catch (err) {
        console.log(`❌ Login error with ${creds.loginType}:`, err.message);
      }
    }
    
    if (!loginSuccess) {
      console.log('❌ All login attempts failed. Cannot test authenticated endpoints.');
      return;
    }
    
    // Test 4: Try to create content
    console.log('\n4. Testing content creation...');
    const testContent = {
      title: 'Debug Test Video - ' + new Date().toISOString(),
      description: 'A test video for API debugging',
      content_type: 'youtube',
      content_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      category: 'education',
      tags: ['test', 'debug'],
      is_published: true
    };
    
    const createResponse = await fetch(`${API_URL}/content`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify(testContent)
    });
    
    if (createResponse.ok) {
      const createData = await createResponse.json();
      console.log('✅ Content creation successful!');
      
      // Test 5: Try to update the created content
      if (createData.content && createData.content.id) {
        console.log('\n5. Testing content update...');
        const updateContent = {
          ...testContent,
          title: testContent.title + ' (Updated)',
          description: 'Updated description for debugging'
        };
        
        const updateResponse = await fetch(`${API_URL}/content/${createData.content.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          },
          body: JSON.stringify(updateContent)
        });
        
        if (updateResponse.ok) {
          console.log('✅ Content update successful!');
        } else {
          console.log('❌ Content update failed:', await updateResponse.text());
        }
        
        // Test 6: Clean up by deleting the test content
        console.log('\n6. Testing content deletion...');
        const deleteResponse = await fetch(`${API_URL}/content/${createData.content.id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        });
        
        if (deleteResponse.ok) {
          console.log('✅ Content deletion successful!');
        } else {
          console.log('❌ Content deletion failed:', await deleteResponse.text());
        }
      }
    } else {
      const errorText = await createResponse.text();
      console.log('❌ Content creation failed:', errorText);
      
      // Try to understand the error better
      try {
        const errorData = JSON.parse(errorText);
        console.log('📋 Error details:', errorData);
      } catch (e) {
        console.log('📋 Raw error response:', errorText);
      }
    }
    
    console.log('\n🎉 Content API tests completed!');
    
  } catch (error) {
    console.error('❌ API test failed:', error.message);
    console.error('Stack trace:', error.stack);
  }
}

// Add comprehensive error handling and diagnostics
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

testContentAPI();
