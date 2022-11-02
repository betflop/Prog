package user

//go:generate mockgen -destination=user_mock.go -package=user . Repository

import (
	"context"
	"crypto/md5"
	"encoding/hex"
	"errors"
)


type Service struct {
	r Repository
}

type Repository interface {
	GetPasswordHash(ctx context.Context, login string) (string, error)
	IsExists(ctx context.Context, login string) (bool, error)
	GetRights(ctx context.Context, login string) ([]string, error)
	Add(ctx context.Context, login string, password string) error
}

var ErrWrongUserNameOrPassword = errors.New("wrong user name or password")
var ErrUserAlreadyExists = errors.New("user already exists")

func New(r Repository) *Service {
	return &Service{
		r: r,
	}
}

func (s *Service) Authentication(ctx context.Context, login, password string) error {
	hashFromDB, err := s.r.GetPasswordHash(ctx, login)

	if err != nil {
		return err
	}

	hash := md5.Sum([]byte(password))
	if hashFromDB == hex.EncodeToString(hash[:]) {
		return nil
	}

	return ErrWrongUserNameOrPassword
}

func (s *Service) RegisterUser(ctx context.Context, login string, password string) error {
	if ok, err := s.r.IsExists(ctx, login); err != nil {
		return err
	} else if ok {
		return ErrUserAlreadyExists
	}

	return s.r.Add(ctx, login, password)
}

func (s *Service) Authorization(ctx context.Context, login string, service string) (bool, error) {
	rights, err := s.r.GetRights(ctx, login)

	if err != nil {
		return false, err
	}

	for _, val := range rights {
		if val == service {
			return true, nil
		}
	}

	return false, nil
}