# ONLYOFFICE app for Bitbucket Cloud

This app allows users to view office files in [Bitbucket Cloud](https://www.atlassian.com/software/bitbucket) using [ONLYOFFICE Docs](https://www.onlyoffice.com/docs).

## Features ✨

* View documents, spreadsheets, PDFs, presentations, and diagrams directly in Bitbucket repositories.

### Supported formats 🗂️

**For viewing:**

* **WORD:** DOC, DOCM, DOCX, DOT, DOTM, DOTX, EPUB, FB2, FODT, ODT, OTT, PAGES, RTF
* **CELL:** FODS, NUMBERS, ODS, OTS, XLS, XLSB, XLSM, XLSX, XLT, XLTM, XLTX
* **SLIDE:** FODP, KEY, ODG, ODP, OTP, POT, POTM, POTX, PPS, PPSM, PPSX, PPT, PPTM, PPTX
* **PDF:** DJVU, OXPS, PDF, XPS
* **DIAGRAM:** VSDM, VSDX, VSSM, VSSX, VSTM, VSTX

## Requirements

 - ONLYOFFICE Docs Atlassian Remote
 - ONLYOFFICE Docs (Document Server)

## App installation 📥

1. Go to [marketplace.atlassian.com](http://marketplace.atlassian.com/).
2. Сhoose the ONLYOFFICE Connector for Bitbucket and click the **Get it now** button.
3. In the pop-up window, select the site where you'd like to install your app and choose the edition you prefer, if multiple editions are available.

> Please note: App configuration is not required — there’s no settings page. The editors are accessed via a demo server.

## Development

1. Clone project from the GitHub repository:
```
git clone https://github.com/ONLYOFFICE/onlyoffice-bitbucket-cloud
```

2. Install the project dependencies:
```
npm install
```

3. Install dependencies in Custom UI Project:
```
cd static/onlyoffice-bitbucket-cloud-custom-ui
npm install
```

4. Build Custom UI Project:
```
npm run build
```

5. Install the Forge CLI globally:
```
npm install -g @forge/cli
```

6. Log in to the Forge CLI ([learn more](https://developer.atlassian.com/platform/forge/getting-started-learn/#log-in-with-an-atlassian-api-token)):
```
forge login
```

7. Specify environment variables in the manifest.yml file:
```
environment:
  variables:
    - key: FORGE_APP_ID
      default: <YOUR_FORGE_APP_ID>
    - key: FORGE_REMOTE_APP_URL
      default: <YOUR_REMOTE_APP_URL>
```

8. Navigate to the app's top-level directory and deploy your app ([learn more](https://developer.atlassian.com/platform/forge/build-a-hello-world-app-in-bitbucket/#install-your-app)):
```
forge deploy
```

9. Install your app:
```
forge install
```

10. You can start tunneling by running:
```
forge tunnel
```
## App usage

The app allows you to view files directly in Bitbucket (editing is not supported).

To open a file in ONLYOFFICE:

- Select the file from your Bitbucket repository.
- On the file page, switch the viewing mode from **Default File Viewer** to **ONLYOFFICE Viewer**. The file will then be displayed directly on the page.

## Need help? User Feedback and Support 💡

* **🐞 Found a bug?** Please report it by creating an [issue](https://github.com/ONLYOFFICE/onlyoffice-bitbucket-cloud/issues).
* **❓ Have a question?** Ask our community and developers on the [ONLYOFFICE Forum](https://community.onlyoffice.com).
* **👨‍💻 Need help for developers?** Check our [API documentation](https://api.onlyoffice.com).
* **💡 Want to suggest a feature?** Share your ideas on our [feedback platform](https://feedback.onlyoffice.com/forums/966080-your-voice-matters).