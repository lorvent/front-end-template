# Vendors

We will have vendors mostly in `node_modules` but when we need to override their values, we use this folder.

For instance, `vendors/_bootstrap.scss` is a file containing all CSS rules intended to re-declare some of Bootstrap’s default CSS. This is to avoid editing the vendor files themselves, which is generally not a good idea.

Guidelines advices to use another folder `vendors-extensions/` but for simplicity sake, we use this folder for vendor overriding.

Reference: [Sass Guidelines](http://sass-guidelin.es/) > [Architecture](http://sass-guidelin.es/#architecture) > [Vendors folder](http://sass-guidelin.es/#vendors-folder)
