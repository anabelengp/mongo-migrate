var query = (!!project) ? {project: project} : {};

var migration_info = db.migration_info.findOne(query);
if (migration_info) {
  print(migration_info.version);
} else {
  print(0);
}
