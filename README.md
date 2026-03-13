# ONLYOFFICE app for Bitbucket Cloud

This app allows users to view office files in [Bitbucket Cloud](https://www.atlassian.com/software/bitbucket) using ONLYOFFICE Docs.

## Features ⭐️

* View documents, spreadsheets, PDFs, and presentations directly in Bitbucket repositories.

### Supported formats

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

5. Install the Forge CLI globally by running:
```
npm install -g @forge/cli
```

6. Log in to the Forge CLI ([Learn more](https://developer.atlassian.com/platform/forge/getting-started-learn/#log-in-with-an-atlassian-api-token)):
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

8. Navigate to the app's top-level directory and deploy your app by running ([Learn more](https://developer.atlassian.com/platform/forge/build-a-hello-world-app-in-bitbucket/#install-your-app)):
```
forge deploy
```

9. Install your app by running:
```
forge install
```

10. You can start tunneling by running:
```
forge tunnel
```

**ONLYOFFICE Docs** packaged as Document Server:

* Community Edition 🆓 (`onlyoffice-documentserver` package) – Perfect for small teams and personal use.
* Enterprise Edition 🏢 (`onlyoffice-documentserver-ee` package) – Designed for businesses with advanced features & support.

The table below will help you make the right choice.

| Pricing and licensing | Community Edition | Enterprise Edition |
| ------------- | ------------- | ------------- |
| | [Get it now](https://www.onlyoffice.com/download-community.aspx?utm_source=github&utm_medium=cpc&utm_campaign=GitHubBitbucketCloud#docs-community)  | [Start Free Trial](https://www.onlyoffice.com/download.aspx?utm_source=github&utm_medium=cpc&utm_campaign=GitHubBitbucketCloud#docs-enterprise)  |
| Cost  | FREE  | [Go to the pricing page](https://www.onlyoffice.com/docs-enterprise-prices.aspx?utm_source=github&utm_medium=cpc&utm_campaign=GitHubBitbucketCloud)  |
| Simultaneous connections | up to 20 maximum  | As in chosen pricing plan |
| Number of users | up to 20 recommended | As in chosen pricing plan |
| License | GNU AGPL v.3 | Proprietary |
| **Support** | **Community Edition** | **Enterprise Edition** |
| Documentation | [Help Center](https://helpcenter.onlyoffice.com/docs/installation/community) | [Help Center](https://helpcenter.onlyoffice.com/docs/installation/enterprise) |
| Standard support | [GitHub](https://github.com/ONLYOFFICE/DocumentServer/issues) or paid | One or three years support included |
| Premium support | [Contact us](mailto:sales@onlyoffice.com) | [Contact us](mailto:sales@onlyoffice.com) |
| **Services** | **Community Edition** | **Enterprise Edition** |
| Conversion Service                | + | + |
| Document Builder Service          | + | + |
| **Interface** | **Community Edition** | **Enterprise Edition** |
| Tabbed interface                       | + | + |
| Dark theme                             | + | + |
| 125%, 150%, 175%, 200% scaling         | + | + |
| White Label                            | - | - |
| Integrated test example (node.js)      | + | + |
| Mobile web editors                     | - | +* |
| **Plugins & Macros** | **Community Edition** | **Enterprise Edition** |
| Plugins                           | + | + |
| Macros                            | + | + |
| **Collaborative capabilities** | **Community Edition** | **Enterprise Edition** |
| Two co-editing modes              | + | + |
| Comments                          | + | + |
| Built-in chat                     | + | + |
| Review and tracking changes       | + | + |
| Display modes of tracking changes | + | + |
| Version history                   | + | + |
| **Document Editor features** | **Community Edition** | **Enterprise Edition** |
| Font and paragraph formatting   | + | + |
| Object insertion                | + | + |
| Adding Content control          | + | + | 
| Editing Content control         | + | + | 
| Layout tools                    | + | + |
| Table of contents               | + | + |
| Navigation panel                | + | + |
| Mail Merge                      | + | + |
| Comparing Documents             | + | + |
| **Spreadsheet Editor features** | **Community Edition** | **Enterprise Edition** |
| Font and paragraph formatting   | + | + |
| Object insertion                | + | + |
| Functions, formulas, equations  | + | + |
| Table templates                 | + | + |
| Pivot tables                    | + | + |
| Data validation           | + | + |
| Conditional formatting          | + | + |
| Sparklines                   | + | + |
| Sheet Views                     | + | + |
| **Presentation Editor features** | **Community Edition** | **Enterprise Edition** |
| Font and paragraph formatting   | + | + |
| Object insertion                | + | + |
| Transitions                     | + | + |
| Animations                      | + | + |
| Presenter mode                  | + | + |
| Notes                           | + | + |
| Slide Master	                  | + | + |
| **Form creator features** | **Community Edition** | **Enterprise Edition** |
| Adding form fields           | + | + |
| Form preview                    | + | + |
| Saving as PDF                   | + | + |
| **PDF Editor features**      | **Community Edition** | **Enterprise Edition** |
| Text editing and co-editing	  | + | + |
| Work with pages (adding, deleting, rotating) | + | + |
| Inserting objects (shapes, images, hyperlinks, etc.) | + | + |
| Text annotations (highlight, underline, cross out) | + | + |
| Comments                        | + | + |
| Freehand drawings               | + | + |
| Form filling                    | + | + |
| | [Get it now](https://www.onlyoffice.com/download-community.aspx?utm_source=github&utm_medium=cpc&utm_campaign=GitHubBitbucketCloud#docs-community)  | [Start Free Trial](https://www.onlyoffice.com/download.aspx?utm_source=github&utm_medium=cpc&utm_campaign=GitHubBitbucketCloud#docs-enterprise)  |

\* If supported by DMS.

## Need help? Feedback & Support 💡

In case of technical problems, the best way to get help is to submit your issues [here](https://github.com/ONLYOFFICE/onlyoffice-bitbucket-cloud/issues). Alternatively, you can contact ONLYOFFICE team via [community.onlyoffice.com](https://community.onlyoffice.com) or [feedback.onlyoffice.com](https://feedback.onlyoffice.com/forums/966080-your-voice-matters).