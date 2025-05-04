<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" style="float: right;">
  <rect width="9" height="9" x="1.5" y="1.5" fill="#c1c1c1" rx="1">
    <animate id="svgSpinnersBlocksScale0" attributeName="x" begin="0;svgSpinnersBlocksScale1.end+0.15s" dur="0.6s" keyTimes="0;.2;1" values="1.5;.5;1.5"/>
    <animate attributeName="y" begin="0;svgSpinnersBlocksScale1.end+0.15s" dur="0.6s" keyTimes="0;.2;1" values="1.5;.5;1.5"/>
    <animate attributeName="width" begin="0;svgSpinnersBlocksScale1.end+0.15s" dur="0.6s" keyTimes="0;.2;1" values="9;11;9"/>
    <animate attributeName="height" begin="0;svgSpinnersBlocksScale1.end+0.15s" dur="0.6s" keyTimes="0;.2;1" values="9;11;9"/>
  </rect>
  <rect width="9" height="9" x="13.5" y="1.5" fill="#c1c1c1" rx="1">
    <animate attributeName="x" begin="svgSpinnersBlocksScale0.begin+0.15s" dur="0.6s" keyTimes="0;.2;1" values="13.5;12.5;13.5"/>
    <animate attributeName="y" begin="svgSpinnersBlocksScale0.begin+0.15s" dur="0.6s" keyTimes="0;.2;1" values="1.5;.5;1.5"/>
    <animate attributeName="width" begin="svgSpinnersBlocksScale0.begin+0.15s" dur="0.6s" keyTimes="0;.2;1" values="9;11;9"/>
    <animate attributeName="height" begin="svgSpinnersBlocksScale0.begin+0.15s" dur="0.6s" keyTimes="0;.2;1" values="9;11;9"/>
  </rect>
  <rect width="9" height="9" x="13.5" y="13.5" fill="#c1c1c1" rx="1">
    <animate attributeName="x" begin="svgSpinnersBlocksScale0.begin+0.3s" dur="0.6s" keyTimes="0;.2;1" values="13.5;12.5;13.5"/>
    <animate attributeName="y" begin="svgSpinnersBlocksScale0.begin+0.3s" dur="0.6s" keyTimes="0;.2;1" values="13.5;12.5;13.5"/>
    <animate attributeName="width" begin="svgSpinnersBlocksScale0.begin+0.3s" dur="0.6s" keyTimes="0;.2;1" values="9;11;9"/>
    <animate attributeName="height" begin="svgSpinnersBlocksScale0.begin+0.3s" dur="0.6s" keyTimes="0;.2;1" values="9;11;9"/>
  </rect>
  <rect width="9" height="9" x="1.5" y="13.5" fill="#c1c1c1" rx="1">
    <animate id="svgSpinnersBlocksScale1" attributeName="x" begin="svgSpinnersBlocksScale0.begin+0.45s" dur="0.6s" keyTimes="0;.2;1" values="1.5;.5;1.5"/>
    <animate attributeName="y" begin="svgSpinnersBlocksScale0.begin+0.45s" dur="0.6s" keyTimes="0;.2;1" values="13.5;12.5;13.5"/>
    <animate attributeName="width" begin="svgSpinnersBlocksScale0.begin+0.45s" dur="0.6s" keyTimes="0;.2;1" values="9;11;9"/>
    <animate attributeName="height" begin="svgSpinnersBlocksScale0.begin+0.45s" dur="0.6s" keyTimes="0;.2;1" values="9;11;9"/>
  </rect>
</svg>

# 🔎 Retrieval Augmented Generation (RAG)

> [!IMPORTANT]
> Retrieval Augmented Generation (RAG) is a cutting-edge technology that enhances the conversational capabilities of chatbots by incorporating context from diverse sources. It works by retrieving relevant information from a wide range of sources such as local and remote documents, web content, and even multimedia sources like YouTube videos. The retrieved text is then combined with a predefined RAG template and prefixed to the user's prompt, providing a more informed and contextually relevant response.

One of the key advantages of RAG is its ability to access and integrate information from a variety of sources, making it an ideal solution for complex conversational scenarios. For instance, when a user asks a question related to a specific document or web page, RAG can retrieve and incorporate the relevant information from that source into the chat response. RAG can also retrieve and incorporate information from multimedia sources like YouTube videos. By analyzing the transcripts or captions of these videos, RAG can extract relevant information and incorporate it into the chat response.

## Local and Remote RAG Integration[​](#local-and-remote-rag-integration "Direct link to Local and Remote RAG Integration")

Local documents must first be uploaded via the Documents section of the Workspace area to access them using the `#` symbol before a query. Click on the formatted URL in the that appears above the chat box. Once selected, a document icon appears above `Send a message`, indicating successful retrieval.

You can also load documents into the workspace area with their access by starting a prompt with `#`, followed by a URL. This can help incorporate web content directly into your conversations.

## Web Search for RAG[​](#web-search-for-rag "Direct link to Web Search for RAG")

For web content integration, start a query in a chat with `#`, followed by the target URL. Click on the formatted URL in the box that appears above the chat box. Once selected, a document icon appears above `Send a message`, indicating successful retrieval. Open WebUI fetches and parses information from the URL if it can.

tip

Web pages often contain extraneous information such as navigation and footer. For better results, link to a raw or reader-friendly version of the page.

## RAG Template Customization[​](#rag-template-customization "Direct link to RAG Template Customization")

Customize the RAG template from the `Admin Panel` &gt; `Settings` &gt; `Documents` menu.

## RAG Embedding Support[​](#rag-embedding-support "Direct link to RAG Embedding Support")

Change the RAG embedding model directly in the `Admin Panel` &gt; `Settings` &gt; `Documents` menu. This feature supports Ollama and OpenAI models, enabling you to enhance document processing according to your requirements.

## Citations in RAG Feature[​](#citations-in-rag-feature "Direct link to Citations in RAG Feature")

The RAG feature allows users to easily track the context of documents fed to LLMs with added citations for reference points. This ensures transparency and accountability in the use of external sources within your chats.

## Enhanced RAG Pipeline[​](#enhanced-rag-pipeline "Direct link to Enhanced RAG Pipeline")

The togglable hybrid search sub-feature for our RAG embedding feature enhances RAG functionality via `BM25`, with re-ranking powered by `CrossEncoder`, and configurable relevance score thresholds. This provides a more precise and tailored RAG experience for your specific use case.

## YouTube RAG Pipeline[​](#youtube-rag-pipeline "Direct link to YouTube RAG Pipeline")

The dedicated RAG pipeline for summarizing YouTube videos via video URLs enables smooth interaction with video transcriptions directly. This innovative feature allows you to incorporate video content into your chats, further enriching your conversation experience.

## Document Parsing[​](#document-parsing "Direct link to Document Parsing")

A variety of parsers extract content from local and remote documents. For more, see the [`get_loader`](https://github.com/open-webui/open-webui/blob/2fa94956f4e500bf5c42263124c758d8613ee05e/backend/apps/rag/main.py#L328) function.

## Google Drive Integration[​](#google-drive-integration "Direct link to Google Drive Integration")

When paired with a Google Cloud project that has the Google Picker API and Google Drive API enabled, this feature allows users to directly access their Drive files from the chat interface and upload documents, slides, sheets and more and uploads them as context to your chat. Can be enabled `Admin Panel` &gt; `Settings` &gt; `Documents` menu. Must set [`GOOGLE_DRIVE_API_KEY and GOOGLE_DRIVE_CLIENT_ID`](https://github.com/open-webui/docs/blob/main/docs/getting-started/env-configuration.md) environment variables to use.

### Detailed Instructions[​](#detailed-instructions "Direct link to Detailed Instructions")

1.  Create an OAuth 2.0 client and configure both the Authorized JavaScript origins &amp; Authorized redirect URI to be the URL (include the port if any) you use to access your Open-WebUI instance.
2.  Make a note of the Client ID associated with that OAuth client.
3.  Make sure that you enable both Google Drive API and Google Picker API for your project.
4.  Also set your app (project) as Testing and add your Google Drive email to the User List
5.  Set the permission scope to include everything those APIs have to offer. And because the app would be in Testing mode, no verification is required by Google to allow the app from accessing the data of the limited test users.
6.  Go to the Google Picker API page, and click on the create credentials button.
7.  Create an API key and under Application restrictions and choose Websites. Then add your Open-WebUI instance's URL, same as the Authorized JavaScript origins and Authorized redirect URIs settings in the step 1.
8.  Set up API restrictions on the API Key to only have access to Google Drive API &amp; Google Picker API
9.  Set up the environment variable, `GOOGLE_DRIVE_CLIENT_ID` to the Client ID of the OAuth client from step 2.
10. Set up the environment variable `GOOGLE_DRIVE_API_KEY` to the API Key value setup up in step 7 (NOT the OAuth client secret from step 2).
11. Set up the `GOOGLE_REDIRECT_URI` to my Open-WebUI instance's URL (include the port, if any).
12. Then relaunch your Open-WebUI instance with those three environment variables.
13. After that, make sure Google Drive was enabled under `Admin Panel` &lt; `Settings` &lt; `Documents` &lt; `Google Drive`

[Edit this page](https://github.com/open-webui/docs/blob/main/docs/features/rag.md)

[Previous
\
📝 Evaluation](/features/evaluation/)

[Next
\
🔰 Customizable Banners](/features/banners)

- [Local and Remote RAG Integration](#local-and-remote-rag-integration)
- [Web Search for RAG](#web-search-for-rag)
- [RAG Template Customization](#rag-template-customization)
- [RAG Embedding Support](#rag-embedding-support)
- [Citations in RAG Feature](#citations-in-rag-feature)
- [Enhanced RAG Pipeline](#enhanced-rag-pipeline)
- [YouTube RAG Pipeline](#youtube-rag-pipeline)
- [Document Parsing](#document-parsing)
- [Google Drive Integration](#google-drive-integration)

    - [Detailed Instructions](#detailed-instructions)

Docs

- [Getting Started](/getting-started)
- [FAQ](/faq)

Community

- [GitHub](https://github.com/open-webui/open-webui)
- [Discord](https://discord.gg/5rJgQTnV4s)
- [𝕏](https://x.com/OpenWebUI)

More

- [Release Notes](https://github.com/open-webui/open-webui/blob/main/CHANGELOG.md)
- [About](https://openwebui.com)

![](/images/logo-dark.png)![](/images/logo-dark.png)
