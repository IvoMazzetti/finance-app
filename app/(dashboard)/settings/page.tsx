"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PlaidLinkOnSuccess, PlaidLinkOptions, usePlaidLink } from "react-plaid-link";
import { createLinkToken } from "@/lib/user.actions";
import { useUser } from '@clerk/nextjs';

const SettingsPage = ( ) => {
    const router = useRouter();
    const [token, setToken] = useState('');
    const { user } = useUser();



    useEffect(() => {
        const getLinkToken = async () => {
            if (user) { // Ensure we have the userId before making the API call
                const data = await createLinkToken({ id: user.id }); // Pass userId to createLinkToken function
                setToken(data?.linkToken);
            }
        };

        getLinkToken();
    }, [user]);

    const onSuccess = useCallback<PlaidLinkOnSuccess>(async (public_token: string) => {
        /* await exchangePublicToken({
            publicToken: public_token,
            user
        }); */

        router.push('/');
    }, [user]);

    const config: PlaidLinkOptions = {
        token,
        onSuccess,
    };

    const { open, ready } = usePlaidLink(config);

    return (
        <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
            <Card className="border-none drop-shadow-sm">
                <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                    <CardTitle className="text-xl line-clamp-1">
                        Settings
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {/* Bank Account Row */}
                    <div className="flex justify-between items-center py-4">
                        <div className="text-lg font-medium">Bank account</div>
                        <div className="text-gray-500 flex-1 text-left mx-4">
                            <span>No bank account connected</span>
                        </div>
                        <button onClick={() => open()} className="text-blue-500 cursor-pointer" disabled={!ready}>
                            Connect
                        </button>

                    </div>
                    <hr className="border-gray-300 my-2" />

                    {/* Subscription Row */}
                    <div className="flex justify-between items-center py-4">
                        <div className="text-lg font-medium">Subscription</div>
                        <div className="text-gray-500 flex-1 text-left mx-4">
                            <span>No subscription active</span>
                        </div>
                        <span className="text-blue-500 cursor-pointer">Upgrade</span>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default SettingsPage;
