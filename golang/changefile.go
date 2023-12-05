package main

import (
	"context"
	"fmt"

	"github.com/docker/docker/api/types"
	"github.com/docker/docker/api/types/filters"
	"github.com/docker/docker/client"
	"github.com/docker/docker/pkg/archive"
)

func main() {
	cli, err := client.NewClientWithOpts(client.FromEnv)
	if err != nil {
		panic(err)
	}

	containerName := "nginx"
	srcFilePath := "./nginx.conf"

	filters := filters.NewArgs()
	filters.Add("name", containerName)
	resp, err := cli.ContainerList(context.Background(), types.ContainerListOptions{Filters: filters})
	if err != nil {
		panic(err)
	}
	if len(resp) > 0 {
		containerID := resp[0].ID

		archive, err := archive.Tar(srcFilePath, archive.Gzip)
		if err != nil {
			panic(err)
		}
		// file, err := os.Open(srcFilePath)
		// if err != nil {
		// panic(err)
		// }
		fmt.Printf("copying %s to container %s\n", srcFilePath, containerID)
		err = cli.CopyToContainer(context.Background(), containerID, "/etc/nginx", archive, types.CopyToContainerOptions{
			AllowOverwriteDirWithFile: true,
		})
		if err != nil {
			panic(err)
		}
		execConfig := types.ExecConfig{
			AttachStdin:  false,
			AttachStdout: true,
			AttachStderr: true,
			Tty:          true,
			Cmd:          []string{"nginx", "-s", "reload"},
		}

		exec, err := cli.ContainerExecCreate(context.Background(), containerID, execConfig)
		if err != nil {
			panic(err)
		}
		fmt.Printf("executing %s in container %s\n", execConfig.Cmd, containerID)
		err = cli.ContainerExecStart(context.Background(), exec.ID, types.ExecStartCheck{})
		if err != nil {
			panic(err)
		}
		fmt.Printf("executed!!! %s in container %s\n", execConfig.Cmd, containerID)
	} else {
		fmt.Printf("container '%s' does not exists\n", containerName)
	}
}
