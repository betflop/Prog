LOCAL_BIN:=$(CURDIR)/bin

.PHONY: generate-mocks
generate-mocks:
	$(LOCAL_BIN)/mockgen --version || GOBIN=$(LOCAL_BIN) go install github.com/golang/mock/mockgen@v1.6.0
	go generate -run "mockgen" ./...

.PHONY: test
test:
	go test -v ./...