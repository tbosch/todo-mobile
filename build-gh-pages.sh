# Build script to update the branch gh-pages, which
# contains the live copy of the demo.
TMP=/tmp/gh-pages
SRC=target/todo-mobile
if mvn package; then
    mkdir -p $TMP
    rm -fr $TMP
    cp -r $SRC/ $TMP
    git stash
    if git checkout gh-pages; then
      rm -fr *
      cp -r $TMP/ .
      git add .
      git commit -a -m "updated pages"
      git checkout master
    fi
    git stash pop
fi

