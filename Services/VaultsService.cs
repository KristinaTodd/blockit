using System;
using System.Collections.Generic;
using System.Data;
using Keepr.Models;
using Keepr.Repositories;

namespace Keepr.Services
{
  public class VaultsService
  {
    private readonly VaultsRepository _repo;
    public VaultsService(VaultsRepository repo)
    {
      _repo = repo;
    }
    internal IEnumerable<Vault> Get(int UserId)
    {
      return _repo.Get(UserId);
    }

    public Vault Create(Vault newVault)
    {
      return _repo.Create(newVault);
    }

    public IEnumerable<Vault> GetUserVaults(string UserId)
    {
      return _repo.GetUserVaults(UserId);
    }

    public Vault GetOne(int id)
    {
      Vault found = _repo.GetOne(id);
      if (found == null)
      {
        throw new Exception("Invalid Id");
      }
      return found;
    }

    internal IEnumerable<VaultKeepViewModel> GetKeepsByVaultId(int vaultId)
    {
      return _repo.GetByVaultId(vaultId);
    }

    public Vault Edit(Vault updatedVault)
    {
      Vault found = GetOne(updatedVault.Id);
      if (found.UserId != updatedVault.UserId)
      {
        throw new Exception("Invalid Request");
      }
      return _repo.Edit(found);
    }

    public Vault Delete(int id, string UserId)
    {
      Vault found = GetOne(id);
      if (found.UserId != UserId)
      {
        throw new Exception("Invalid Request");
      }
      if (_repo.Delete(id))
      {
        return found;
      }
      throw new Exception("Something went very wrong");
    }

  }
}