.PHONY: clean check test

LIBDIR = lib
REPORTSDIR = reports

all: node_modules lib

node_modules: package.json
#	@rm -rf node_modules
#	@npm install
	@npm update
	@touch $@

check:
	@eslint --ext .js,.jsx ./src

test: node_modules clean check
	@jest

clean:
	@rm -rf $(LIBDIR)
	@rm -rf $(REPORTSDIR)

lib: clean
	@rollup -c
	@rollup -c -f cjs -o lib/cjs-index.js
