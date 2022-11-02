package user

import (
	"context"
	"testing"

	"github.com/golang/mock/gomock"
	"github.com/stretchr/testify/require"

	"github.com/stretchr/testify/assert"
)

func TestAuthorization(t *testing.T) {
	t.Run("ok", func (t *testing.T) {
		ctrl := gomock.NewController(t)
		mockRepository := NewMockRepository(ctrl)

		s := New(mockRepository)
		ctx := context.Background()

		login := "sirius"
		service := "qwerty"

		mockRepository.EXPECT().GetRights(gomock.Any(), gomock.Eq(login)).Times(1).Return([]string{service}, nil)

		ok, err := s.Authorization(ctx, login, service)

		require.NoError(t, err)
		assert.Equal(t, true, ok)
	})

	t.Run("fail", func (t *testing.T) {
		ctrl := gomock.NewController(t)
		mockRepository := NewMockRepository(ctrl)

		s := New(mockRepository)
		ctx := context.Background()

		login := "sirius"
		service := "qwerty"


		mockRepository.EXPECT().GetRights(gomock.Any(), gomock.Eq(login)).Times(1).Return([]string{service}, nil)

		ok, err := s.Authorization(ctx, login, "123")

		require.NoError(t, err)
		assert.Equal(t, false, ok)
	})
}