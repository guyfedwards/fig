package store

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
)

type Storer interface {
	Write(DataV1) error
	Read() (DataV1, error)
}

type Store struct {
	configPath string
}

func New(configPath string) Store {
	return Store{
		configPath: configPath,
	}
}

type Gif struct {
	URL string `json:"url"`
}

type DataV1 map[string]Gif

func (s Store) Read() (DataV1, error) {
	rawData, err := os.ReadFile(filepath.Join(s.configPath, "fig.db"))
	if err != nil {
		return map[string]Gif{}, fmt.Errorf("store.Read: %w", err)
	}

	var dataV1 DataV1

	err = json.Unmarshal(rawData, &dataV1)
	if err != nil {
		return DataV1{}, fmt.Errorf("store.Read: %w", err)
	}

	return dataV1, nil
}

func (s Store) Write(d DataV1) error {
	str, err := json.Marshal(d)
	if err != nil {
		return fmt.Errorf("Write: %w", err)
	}

	os.WriteFile(filepath.Join(s.configPath, "fig.db"), str, 0644)
	return nil
}
