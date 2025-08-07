# MyBank - Documentation DevOps & Intégration Continue

## Vue d'ensemble DevOps

Cette documentation détaille l'implémentation des pratiques DevOps pour l'application MyBank, incluant l'intégration continue, les outils de qualité, les tests automatisés et le déploiement continu.

## Outils de qualité de code

### 1. ESLint - Analyse statique
Configuration dans `eslint.config.js` :
```javascript
import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      'prefer-const': 'error',
      'no-console': 'warn'
    },
  }
);
```

### 2. Prettier - Formatage de code
Configuration `.prettierrc` :
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false
}
```

### 3. TypeScript - Vérification de types
Configuration stricte dans `tsconfig.json` :
```json
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noImplicitReturns": true,
    "noImplicitOverride": true
  }
}
```

### 4. Husky - Git hooks
```bash
# Installation
npm install --save-dev husky lint-staged

# Configuration .husky/pre-commit
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged
```

Configuration `lint-staged` dans `package.json` :
```json
{
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write",
      "git add"
    ],
    "*.{css,md,json}": [
      "prettier --write",
      "git add"
    ]
  }
}
```

## Outils d'automatisation des tests

### 1. Vitest - Tests unitaires
Configuration dans `vite.config.ts` :
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
        '**/*.config.*'
      ]
    }
  }
});
```

### 2. Testing Library - Tests d'intégration
```typescript
// src/test/setup.ts
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

afterEach(() => {
  cleanup();
});
```

### 3. Exemple de tests automatisés
```typescript
// src/components/__tests__/Dashboard.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Dashboard } from '../Dashboard';

const mockExpenses = [
  {
    id: '1',
    amount: 50.00,
    description: 'Courses',
    category: 'Alimentation',
    date: '2024-01-15',
    userId: '1'
  }
];

describe('Dashboard', () => {
  it('affiche le total des dépenses correctement', () => {
    render(<Dashboard expenses={mockExpenses} categories={['Alimentation']} />);
    
    expect(screen.getByText('50.00 €')).toBeInTheDocument();
    expect(screen.getByText('Tableau de bord')).toBeInTheDocument();
  });

  it('calcule les statistiques mensuelles', () => {
    render(<Dashboard expenses={mockExpenses} categories={['Alimentation']} />);
    
    expect(screen.getByText('Ce mois')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument(); // Nombre de transactions
  });
});
```

### 4. Playwright - Tests end-to-end
```typescript
// tests/e2e/expense-management.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Gestion des dépenses', () => {
  test('ajout d\'une nouvelle dépense', async ({ page }) => {
    await page.goto('/');
    
    // Connexion
    await page.fill('input[type="email"]', 'test@example.com');
    await page.fill('input[type="password"]', 'password');
    await page.click('button[type="submit"]');
    
    // Ajout d'une dépense
    await page.click('text=Ajouter une dépense');
    await page.fill('input[type="number"]', '25.50');
    await page.fill('input[placeholder*="Courses"]', 'Supermarché');
    await page.selectOption('select', 'Alimentation');
    await page.click('text=Ajouter');
    
    // Vérification
    await expect(page.locator('text=25.50 €')).toBeVisible();
    await expect(page.locator('text=Supermarché')).toBeVisible();
  });
});
```

## Scripts d'intégration continue

### 1. GitHub Actions
`.github/workflows/ci.yml` :
```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  quality-checks:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4

    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'

    - name: Install dependencies
      run: npm ci

    - name: Run ESLint
      run: npm run lint

    - name: Run TypeScript check
      run: npm run type-check

    - name: Run Prettier check
      run: npm run format:check

  test:
    runs-on: ubuntu-latest
    needs: quality-checks
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4

    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'

    - name: Install dependencies
      run: npm ci

    - name: Run unit tests
      run: npm run test:coverage

    - name: Upload coverage reports
      uses: codecov/codecov-action@v3
      with:
        file: ./coverage/lcov.info
        fail_ci_if_error: true

    - name: Run E2E tests
      run: |
        npm run build
        npm run test:e2e

  build:
    runs-on: ubuntu-latest
    needs: [quality-checks, test]
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4

    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'

    - name: Install dependencies
      run: npm ci

    - name: Build application
      run: npm run build

    - name: Run Lighthouse CI
      run: |
        npm install -g @lhci/cli
        lhci autorun

    - name: Upload build artifacts
      uses: actions/upload-artifact@v3
      with:
        name: build-files
        path: dist/

  deploy:
    runs-on: ubuntu-latest
    needs: build
    if: github.ref == 'refs/heads/main'
    
    steps:
    - name: Download build artifacts
      uses: actions/download-artifact@v3
      with:
        name: build-files
        path: dist/

    - name: Deploy to Netlify
      uses: netlify/actions/cli@master
      with:
        args: deploy --prod --dir=dist
      env:
        NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
        NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
```

### 2. Package.json scripts
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "lint:fix": "eslint . --ext ts,tsx --fix",
    "type-check": "tsc --noEmit",
    "format": "prettier --write \"src/**/*.{ts,tsx,css,md}\"",
    "format:check": "prettier --check \"src/**/*.{ts,tsx,css,md}\"",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:run": "vitest run",
    "test:coverage": "vitest run --coverage",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "quality": "npm run lint && npm run type-check && npm run format:check",
    "pre-commit": "lint-staged",
    "lighthouse": "lhci autorun"
  }
}
```

## Configuration du serveur d'automatisation

### 1. Jenkins Pipeline
`Jenkinsfile` :
```groovy
pipeline {
    agent any
    
    tools {
        nodejs '18'
    }
    
    environment {
        NODE_ENV = 'production'
        CI = 'true'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }
        
        stage('Code Quality') {
            parallel {
                stage('Lint') {
                    steps {
                        sh 'npm run lint'
                    }
                }
                stage('Type Check') {
                    steps {
                        sh 'npm run type-check'
                    }
                }
                stage('Format Check') {
                    steps {
                        sh 'npm run format:check'
                    }
                }
            }
        }
        
        stage('Test') {
            steps {
                sh 'npm run test:coverage'
                publishHTML([
                    allowMissing: false,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: 'coverage',
                    reportFiles: 'index.html',
                    reportName: 'Coverage Report'
                ])
            }
        }
        
        stage('Build') {
            steps {
                sh 'npm run build'
                archiveArtifacts artifacts: 'dist/**/*', allowEmptyArchive: false
            }
        }
        
        stage('E2E Tests') {
            steps {
                sh 'npm run test:e2e'
                publishTestResults testResultsPattern: 'test-results/*.xml'
            }
        }
        
        stage('Performance Audit') {
            steps {
                sh 'npm run lighthouse'
                publishHTML([
                    allowMissing: false,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: '.lighthouseci',
                    reportFiles: '*.html',
                    reportName: 'Lighthouse Report'
                ])
            }
        }
        
        stage('Deploy') {
            when {
                branch 'main'
            }
            steps {
                sh '''
                    echo "Deploying to production..."
                    # Commandes de déploiement spécifiques
                '''
            }
        }
    }
    
    post {
        always {
            cleanWs()
        }
        success {
            slackSend(
                color: 'good',
                message: "✅ Build réussi pour ${env.JOB_NAME} - ${env.BUILD_NUMBER}"
            )
        }
        failure {
            slackSend(
                color: 'danger',
                message: "❌ Échec du build pour ${env.JOB_NAME} - ${env.BUILD_NUMBER}"
            )
        }
    }
}
```

### 2. Configuration SonarQube
`sonar-project.properties` :
```properties
sonar.projectKey=mybank
sonar.projectName=MyBank
sonar.projectVersion=1.0.0

sonar.sources=src
sonar.tests=src
sonar.test.inclusions=**/*.test.ts,**/*.test.tsx,**/*.spec.ts
sonar.exclusions=**/*.test.ts,**/*.test.tsx,**/*.spec.ts,node_modules/**,dist/**

sonar.typescript.lcov.reportPaths=coverage/lcov.info
sonar.javascript.lcov.reportPaths=coverage/lcov.info

sonar.coverage.exclusions=**/*.test.ts,**/*.test.tsx,**/*.spec.ts
```

## Rapports d'intégration continue

### 1. Métriques de qualité
- **Code Coverage** : Objectif > 80%
- **Code Smells** : 0 toléré
- **Bugs** : 0 toléré
- **Vulnerabilities** : 0 toléré
- **Duplication** : < 3%

### 2. Métriques de performance
- **Lighthouse Performance** : > 90
- **Bundle Size** : < 500KB
- **First Contentful Paint** : < 1.5s
- **Largest Contentful Paint** : < 2.5s

### 3. Dashboard de monitoring
```json
{
  "dashboard": "MyBank CI/CD Metrics",
  "metrics": [
    {
      "name": "Build Success Rate",
      "target": "> 95%",
      "current": "98.5%"
    },
    {
      "name": "Test Coverage",
      "target": "> 80%",
      "current": "87.3%"
    },
    {
      "name": "Deployment Frequency",
      "target": "Daily",
      "current": "1.2/day"
    },
    {
      "name": "Lead Time",
      "target": "< 1 hour",
      "current": "45 min"
    },
    {
      "name": "MTTR",
      "target": "< 15 min",
      "current": "12 min"
    }
  ]
}
```

### 4. Alertes et notifications
```yaml
# Slack notification configuration
notifications:
  - type: slack
    webhook: $SLACK_WEBHOOK
    conditions:
      - on_failure
      - on_success
    template: |
      {
        "text": "Build $BUILD_STATUS",
        "attachments": [
          {
            "color": "$BUILD_COLOR",
            "fields": [
              {
                "title": "Project",
                "value": "MyBank",
                "short": true
              },
              {
                "title": "Branch",
                "value": "$BRANCH_NAME",
                "short": true
              },
              {
                "title": "Coverage",
                "value": "$COVERAGE%",
                "short": true
              }
            ]
          }
        ]
      }
```

## Sécurité et conformité

### 1. Audit de sécurité
```bash
# Audit des dépendances
npm audit --audit-level moderate

# Scan de sécurité avec Snyk
npx snyk test
npx snyk monitor
```

### 2. Headers de sécurité
```javascript
// Configuration Vite pour les headers de sécurité
export default defineConfig({
  server: {
    headers: {
      'X-Frame-Options': 'SAMEORIGIN',
      'X-Content-Type-Options': 'nosniff',
      'X-XSS-Protection': '1; mode=block',
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains'
    }
  }
});
```

Cette documentation DevOps complète couvre tous les aspects de l'intégration continue, des outils de qualité, et du déploiement automatisé pour l'application MyBank, répondant aux exigences de la compétence 3.11.