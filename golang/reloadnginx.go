package main

import (
	"bytes"
	"context"
	"fmt"
	"io"

	"github.com/docker/docker/api/types"
	"github.com/docker/docker/api/types/filters"
	"github.com/docker/docker/client"
)

func main() {
	cli, err := client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())
	if err != nil {
		panic(err)
	}

	containerName := "nginx"

	filters := filters.NewArgs()
	filters.Add("name", containerName)
	resp, err := cli.ContainerList(context.Background(), types.ContainerListOptions{Filters: filters})
	if err != nil {
		panic(err)
	}
	if len(resp) > 0 {

		containerID := resp[0].ID
		// Create an exec instance in the "nginx" container
		execConfig := types.ExecConfig{
			Cmd:          []string{"nginx", "-s", "reload"},
			AttachStdout: true,
			AttachStderr: true,
		}
		ctx := context.Background()
		exec, err := cli.ContainerExecCreate(ctx, containerID, execConfig)
		if err != nil {
			panic(err)
		}

		// Start the exec instance
		attachResp, err := cli.ContainerExecAttach(ctx, exec.ID, types.ExecStartCheck{})
		if err != nil {
			panic(err)
		}
		defer attachResp.Close()

		// Read the output
		buf := new(bytes.Buffer)
		_, err = io.Copy(buf, attachResp.Reader)
		if err != nil {
			panic(err)
		}

		fmt.Printf("Output: %s", buf.String())
	} else {
		fmt.Printf("container '%s' does not exists\n", containerName)
	}
}
