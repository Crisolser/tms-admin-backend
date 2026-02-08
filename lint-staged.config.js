export default {
  '**/*.js': (files) =>
    files.map((file) => `eslint --fix "${file}"`)
}