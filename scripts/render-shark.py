import bpy,math,os
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
from mathutils import Vector
bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_scene.gltf(filepath=str(ROOT/'source-models/reef-shark-e486ff.glb'))
s=bpy.context.scene
# glTF importer bone display mesh is not part of the animal.
if 'Icosphere' in bpy.data.objects:bpy.data.objects.remove(bpy.data.objects['Icosphere'],do_unlink=True)
a=bpy.data.objects['body'];a.animation_data.action=bpy.data.actions['Swim_body']
for t in a.animation_data.nla_tracks:t.mute=True
s.render.engine='CYCLES';s.cycles.samples=24;s.cycles.use_denoising=False
s.render.resolution_x=512;s.render.resolution_y=320;s.render.resolution_percentage=100;s.render.film_transparent=True
s.world=bpy.data.worlds.new('World');s.world.use_nodes=True;s.world.node_tree.nodes['Background'].inputs[0].default_value=(.65,.78,.85,1);s.world.node_tree.nodes['Background'].inputs[1].default_value=.65
bpy.ops.object.camera_add(location=(3,0,.65));cam=bpy.context.object;s.camera=cam;cam.data.type='ORTHO';cam.data.ortho_scale=1.85
center=Vector((0,0,.24));cam.rotation_euler=(center-cam.location).to_track_quat('-Z','Y').to_euler()
for loc,power,size in [((2,-2,3),160,3),((-2,1,2),90,2)]:
 bpy.ops.object.light_add(type='AREA',location=loc);o=bpy.context.object;o.data.energy=power;o.data.shape='DISK';o.data.size=size;o.rotation_euler=(center-o.location).to_track_quat('-Z','Y').to_euler()
os.makedirs('/tmp/sharkframes',exist_ok=True)
for kind,count in [('swim',12),('turn',6)]:
 for i in range(count):
  s.frame_set(int(i*33.6/12) if kind=='swim' else 0)
  # Camera on -X shows the shark facing right; orbit through front to turn.
  angle=(i/5*math.pi) if kind=='turn' else 0
  cam.location=(-3*math.cos(angle),-3*math.sin(angle),.65)
  cam.rotation_euler=(center-cam.location).to_track_quat('-Z','Y').to_euler()
  s.render.filepath=f'/tmp/sharkframes/{kind}{i:02}.png';bpy.ops.render.render(write_still=True)
