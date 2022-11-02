package user

import (
	"context"
	"crypto/md5"
	"encoding/hex"
	"testing"

	"github.com/golang/mock/gomock"

	"github.com/stretchr/testify/assert"
)

func TestAuthentication(t *testing.T) {
	t.Run("ok", func (t *testing.T) {
		ctrl := gomock.NewController(t)
		mockRepository := NewMockRepository(ctrl)

		s := New(mockRepository)
		ctx := context.Background()

		login := "sirius"
		password := "qwerty"

		hash := md5.Sum([]byte(password))
		passwordHash := hex.EncodeToString(hash[:])

		mockRepository.EXPECT().GetPasswordHash(gomock.Any(), gomock.Eq(login)).Times(1).Return(passwordHash, nil)

		err := s.Authentication(ctx, login, password)

		assert.NoError(t, err)
	})

	t.Run("fail", func (t *testing.T) {
		ctrl := gomock.NewController(t)
		mockRepository := NewMockRepository(ctrl)

		s := New(mockRepository)
		ctx := context.Background()

		login := "sirius"
		password := "qwerty"

		hash := md5.Sum([]byte(password))
		passwordHash := hex.EncodeToString(hash[:])

		mockRepository.EXPECT().GetPasswordHash(gomock.Any(), gomock.Eq(login)).Times(1).Return(passwordHash, nil)

		err := s.Authentication(ctx, login, "123")

		assert.Error(t, err)
	})
}