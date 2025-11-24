#!/usr/bin/env node

/**
 * 将项目文件同步到模板目录
 * 用于更新 CLI 工具的模板
 */

import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROJECT_ROOT = path.resolve(__dirname, '../..');
const TEMPLATE_DIR = path.resolve(__dirname, '../template');

// 需要排除的文件和目录
const EXCLUDE_PATTERNS = [
  'node_modules',
  'dist',
  '.git',
  'pnpm-lock.yaml',
  'package-lock.json',
  'yarn.lock',
  '.DS_Store',
  '*.log',
  'cli', // 排除 CLI 目录本身
  '.vscode',
  '.idea',
];

// 需要复制的文件和目录
const FILES_TO_COPY = [
  'src',
  'public',
  'index.html',
  'package.json',
  'tsconfig.json',
  'tsconfig.app.json',
  'tsconfig.node.json',
  'vite.config.ts',
  'tailwind.config.js',
  'postcss.config.js',
  '.eslintrc.cjs',
  'README.md',
  'TROUBLESHOOTING.md',
];

async function syncTemplate() {
  console.log('🔄 Syncing project files to template directory...\n');

  // 清空模板目录
  await fs.emptyDir(TEMPLATE_DIR);

  // 复制文件
  for (const item of FILES_TO_COPY) {
    const srcPath = path.join(PROJECT_ROOT, item);
    const destPath = path.join(TEMPLATE_DIR, item);

    if (await fs.pathExists(srcPath)) {
      await fs.copy(srcPath, destPath);
      console.log(`✅ Copied: ${item}`);
    } else {
      console.log(`⚠️  Not found: ${item}`);
    }
  }

  // 创建 .gitkeep 文件（如果需要）
  const gitkeepPath = path.join(TEMPLATE_DIR, '.gitkeep');
  if (!(await fs.pathExists(gitkeepPath))) {
    await fs.writeFile(gitkeepPath, '# Template files\n');
  }

  console.log('\n✨ Template sync completed!');
}

syncTemplate().catch((error) => {
  console.error('❌ Error syncing template:', error);
  process.exit(1);
});
