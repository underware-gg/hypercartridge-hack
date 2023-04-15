# ValueScript Server Demo

Uses deno ([install](https://deno.land/manual@v1.32.4/getting_started/installation))

```sh
./start.ts
```

Expected output:

```
ValueScript server running
E.g.
  curl -X POST -d 'return 1 + 1;' http://localhost:8080
  curl -X POST -d 'while (true) {} return 1 + 1;' http://localhost:8080
```

Curl output:

```
$ curl -X POST -d 'return 1 + 1;' http://localhost:8080
{"Ok":"2"}
```

```
$ curl -X POST -d 'while (true) {} return 1 + 1;' http://localhost:8080
{"Err":"Error{\"message\":\"step limit reached\"}"}
```
