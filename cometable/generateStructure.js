const fs = require("fs");
const path = require("path");

// Funkcja do tworzenia folderów i plików
function createStructure(baseDir, structure) {
  Object.entries(structure).forEach(([key, value]) => {
    const fullPath = path.join(baseDir, key);
    if (typeof value === "object") {
      // Jeśli to obiekt - tworzymy katalog
      fs.mkdirSync(fullPath, { recursive: true });
      createStructure(fullPath, value); // Rekurencja
    } else {
      // Jeśli to string - tworzymy plik
      fs.writeFileSync(fullPath, "");
    }
  });
}

// Struktura aplikacji
const structure = {
  src: {
    api: {
      "authApi.js": "",
      "crmApi.js": "",
      "erpApi.js": "",
      "docsApi.js": "",
      "integrationsApi.js": "",
    },
    assets: {
      images: {
        "logo.png": "",
      },
      icons: {},
      fonts: {},
      styles: {
        "global.css": "",
        "variables.css": "",
      },
    },
    components: {
      layout: {
        "Navbar.js": "",
        "Sidebar.js": "",
        "Footer.js": "",
        "index.js": "",
      },
      shared: {
        "Button.js": "",
        "Modal.js": "",
        "Table.js": "",
        "Card.js": "",
      },
      notifications: {
        "NotificationItem.js": "",
        "NotificationList.js": "",
        "index.js": "",
      },
    },
    config: {
      "routes.js": "",
      "store.js": "",
      "i18n.js": "",
      "theme.js": "",
    },
    features: {
      auth: {
        components: {
          "AuthForm.js": "",
          "LoginForm.js": "",
          "RegisterForm.js": "",
        },
        pages: {
          "LoginPage.js": "",
          "RegisterPage.js": "",
        },
        store: {
          "authSlice.js": "",
          "authThunks.js": "",
        },
      },
      crm: {
        components: {
          "LeadTable.js": "",
          "LeadForm.js": "",
          "CampaignCard.js": "",
        },
        pages: {
          "LeadsPage.js": "",
          "CampaignsPage.js": "",
          "ClientsPage.js": "",
        },
        store: {
          "crmSlice.js": "",
          "crmThunks.js": "",
        },
      },
      erp: {
        components: {
          "InventoryList.js": "",
          "OrderForm.js": "",
          "FinanceDashboard.js": "",
          "ProductionPlanner.js": "",
        },
        pages: {
          "InventoryPage.js": "",
          "FinancesPage.js": "",
          "OrdersPage.js": "",
          "ProductionPage.js": "",
        },
        store: {
          "erpSlice.js": "",
          "erpThunks.js": "",
        },
      },
      docs: {
        components: {
          "DocumentEditor.js": "",
          "DocumentList.js": "",
          "InvoiceForm.js": "",
        },
        pages: {
          "DocumentsPage.js": "",
          "InvoicesPage.js": "",
          "ContractsPage.js": "",
        },
        store: {
          "docsSlice.js": "",
          "docsThunks.js": "",
        },
      },
      tasks: {
        components: {
          "TaskBoard.js": "",
          "TaskCard.js": "",
          "SprintList.js": "",
          "GanttChart.js": "",
        },
        pages: {
          "KanbanPage.js": "",
          "SprintsPage.js": "",
          "GanttPage.js": "",
        },
        store: {
          "tasksSlice.js": "",
          "tasksThunks.js": "",
        },
      },
      integrations: {
        components: {
          "ZapierIntegrationForm.js": "",
          "MakeIntegrationForm.js": "",
          "WebhookSettings.js": "",
        },
        pages: {
          "IntegrationsPage.js": "",
        },
        store: {
          "integrationsSlice.js": "",
          "integrationsThunks.js": "",
        },
      },
      portal: {
        components: {
          "SelfServiceDashboard.js": "",
          "OfferGenerator.js": "",
        },
        pages: {
          "PortalHomePage.js": "",
          "OrdersStatusPage.js": "",
          "SupportTicketsPage.js": "",
        },
        store: {
          "portalSlice.js": "",
          "portalThunks.js": "",
        },
      },
    },
    hooks: {
      "useFetch.js": "",
      "usePagination.js": "",
      "usePrevious.js": "",
      "useDebounce.js": "",
    },
    services: {
      "pdfService.js": "",
      "storageService.js": "",
      "authService.js": "",
      "docSignService.js": "",
      "emailService.js": "",
      "paymentService.js": "",
    },
    store: {
      "rootReducer.js": "",
      "rootSaga.js": "", // jeśli używasz redux-saga
      "index.js": "",
    },
    utils: {
      "validation.js": "",
      "formatDate.js": "",
      "parseQuery.js": "",
      "logger.js": "",
    },
    "App.js": "",
    "index.js": "",
    "setupTests.js": "",
  },
  public: {
    "index.html": "",
    "favicon.ico": "",
  },
  ".env": "",
  ".gitignore": "",
  "package.json": "",
  "yarn.lock": "",
  "README.md": "",
};

const targetDir = path.join(__dirname, "react-app");
fs.mkdirSync(targetDir, { recursive: true });
createStructure(targetDir, structure);

console.log("Struktura plików i katalogów została utworzona!");
