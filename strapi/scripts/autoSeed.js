const { spawn } = require('child_process');

const seed = spawn('npm', ['run', 'seed'], {
  stdio: ['pipe', 'pipe', 'inherit'],
  shell: true,
});

seed.stdout.on('data', (data) => {
  const output = data.toString().toLowerCase();
  console.log(output);

  // تشخیص سوال‌های معمول
  if (
    output.includes('do you want') ||
    output.includes('are you sure') ||
    output.includes('(y/n)') ||
    output.includes('[y/n]') ||
    output.includes('confirm') ||
    output.includes('reset')
  ) {
    seed.stdin.write('y\n');
  }
});

seed.on('close', (code) => {
  console.log(`Seed process exited with code ${code}`);
  seed.stdin.end();
});
