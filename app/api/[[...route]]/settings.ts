import { Hono } from 'hono';
import { ClerkClient } from '@clerk/backend';
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
// Create a new Hono app
const app = new Hono();

// Apply Clerk middleware to protect routes
app.use('*', clerkMiddleware());

// Endpoint to create a subscription
app.post('/create-subscription', async (c) => {

    const auth = getAuth(c);
    const { email, name } = await c.req.json(); // Get customer data from the request body

    if (!auth?.userId) {
        return c.json({ error: "Unauthorized" }, 401);
    }

    try {
        const response = await fetch('https://api.lemonsqueezy.com/v1/subscriptions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer YOUR_API_KEY`, // Replace with your API key
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                product_id: 'YOUR_PRODUCT_ID', // Replace with your product ID
                customer: {
                    email: email,
                    name: name,
                },
            }),
        });

        const data = await response.json();

        if (response.ok) {
            // Subscription created successfully
            return c.json({ success: true, subscription: data }, 201);
        } else {
            // Handle errors from LemonSqueezy
            return c.json({ success: false, message: data.message }, response.status);
        }
    } catch (error) {
        console.error('Error creating subscription:', error);
        return c.json({ success: false, message: 'Failed to create subscription' }, 500);
    }
});

// Start the server
app.fire();
