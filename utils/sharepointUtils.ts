interface SharePointFileUploadResponse {
    d: {
        ServerRelativeUrl: string;
    };
}

interface TokenResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
    scope: string;
}

// Fuunction tot get SharePoint access token
export async function getSharePointAccessToken(): Promise<string> {
    const tokenEndpoint = 'https://login.microsoftonline.com/common/oauth2/v2.0/token';
    const clientId = process.env.SP_CLIENT_ID;
    const clientSecret = process.env.SP_CLIENT_SECRET;
    const scope = 'https://graph.microsoft.com/.default';

    if (!clientId || !clientSecret) {
        throw new Error('Missing client ID or client secret');
    }

    const requestBody = new URLSearchParams();
    requestBody.append('grant_type', 'client_credentials');
    requestBody.append('client_id', clientId);
    requestBody.append('client_secret', clientSecret);
    requestBody.append('scope', scope);

    try {
        const response = await fetch(tokenEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: requestBody.toString(),
        });

        if (!response.ok) {
            throw new Error(`Failed to get SharePoint access token: ${response.statusText}`);
        }

        const data: TokenResponse = await response.json();
        return data.access_token;
    } catch (error) {
        console.error('Error obtaining access token:', error);
        throw new Error('Failed to obtain access token');
    }
};

export async function uploadFileToSharePoint(
    accessToken: string,
    sharepointUrl: string,
    libraryName: string,
    fileName: string,
    fileBuffer: Buffer
): Promise<string> {
    const uploadUrl = `${sharepointUrl}/_api/web/GetFolderByServerRelativeUrl('${libraryName}')/Files/add(url='${fileName}',overwrite=true)`;

    const header = {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/octet-stream',
    };

    const response = await fetch(uploadUrl, {
        method: 'POST',
        headers: header,
        body: fileBuffer,
    });


    if (!response.ok) {
        throw new Error(`Failed to upload file to SharePoint: ${response.statusText}`);
    }

    const responseData: SharePointFileUploadResponse = await response.json();

    return responseData.d.ServerRelativeUrl;
};