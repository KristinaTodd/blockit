using System;
using System.Collections.Generic;
using System.Data;
using Keepr.Models;
using Keepr.Repositories;

namespace Keepr.Services
{
  public class KeepsService
  {
    private readonly KeepsRepository _repo;
    public KeepsService(KeepsRepository repo)
    {
      _repo = repo;
    }
    internal IEnumerable<Keep> Get()
    {
      return _repo.Get();
    }

    public Keep Create(Keep newKeep)
    {
      return _repo.Create(newKeep);
    }

    public IEnumerable<Keep> GetUserKeeps(string UserId)
    {
      return _repo.GetUserKeeps(UserId);
    }

    public Keep Get(int id)
    {
      Keep found = _repo.Get(id);
      if (found == null)
      {
        throw new Exception("Invalid Id");
      }
      return found;
    }

    public Keep Edit(Keep updatedKeep)
    {
      Keep found = Get(updatedKeep.Id);
      if (found.UserId != updatedKeep.UserId)
      {
        throw new Exception("Invalid Request");
      }
      found.Views = updatedKeep.Views;
      found.Shares = updatedKeep.Shares;
      found.Keeps = updatedKeep.Keeps;

      return _repo.Edit(found);
    }

    public Keep Delete(int id, string UserId)
    {
      Keep found = Get(id);
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