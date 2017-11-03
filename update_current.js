var query = (!!project) ? {project: project} : {};
var migration_info = db.migration_info.findOne(query);
if (migration_info) {
  migration_info.version = current;
} else {
  migration_info = {_id: new ObjectId(), version: current};
  if (!!project) migration_info.project = project;
}
db.migration_info.save(migration_info);
