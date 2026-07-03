const test = require('node:test');
const assert = require('node:assert/strict');

const blogService = require('../services/blogService');
const projectService = require('../services/projectService');

const uniqueSuffix = Date.now();

test('blog creation falls back to a default category when no categoryId is provided', async () => {
  const post = await blogService.createBlogPost({
    title: `Fallback Blog ${uniqueSuffix}`,
    content: 'A regression test for category fallback.',
    status: 'PUBLISHED',
  });

  assert.ok(post.id);
  assert.equal(post.category.name, 'General');
  assert.ok(post.categoryId);
});

test('project creation falls back to a default category when no categoryId is provided', async () => {
  const project = await projectService.createProject({
    title: `Fallback Project ${uniqueSuffix}`,
    description: 'A regression test for project category fallback.',
    status: 'ACTIVE',
  });

  assert.ok(project.id);
  assert.equal(project.category.name, 'General');
  assert.ok(project.categoryId);
});
