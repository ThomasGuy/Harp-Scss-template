const gulp = require('gulp');
const harp = require('harp');
// const prefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync');

const { reload: andload } = browserSync;
/**
 * Serve the Harp Site from the src directory
 */
gulp.task('serve', () => {
  harp.server((__dirname, '/app').resolve(), {
    port: 9000
  }, () => {
    browserSync({
      proxy: 'localhost:9000',
      open: false,
      /* Hide the notification. It gets annoying */
      notify: {
        styles: ['opacity: 1', 'position: absolute']
      }
    });
    /**
     * Watch for scss changes, tell BrowserSync to refresh main.css
     */
    gulp.watch(['app/stylesheets/**/*.scss'], () => {
      andload('app/stylesheets/main.css', { stream: true });
    });
    /**
     * Watch for all other changes, reload the whole page
     */
    gulp.watch(['./**/*.ejs', './**/*.js', './**/*.json', './**/*.md'], () => {
      andload();
    });
  });
});

/**
 * Default task, running `gulp` will fire up the Harp site,
 * launch BrowserSync & watch files.
 */
gulp.task('default', ['serve']);
